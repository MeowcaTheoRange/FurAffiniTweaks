const uwuDictionary = {
	you: "u",
	You: "U",
	love: "wuv",
	Love: "Wuv",
	hello: "hewwo",
	hi: "haii",
	friend: "fwend",
	very: "bery",
	little: "wittwe",
	cute: "kawaii~",
	thank: "fank",
	sorry: "sowwy",
	please: "pwease",
	me: "mew",
	my: "mai",
	your: "ur",
	has: "haz",
	have: "haz",
};

function softenWord(word) {
	if (word.length <= 3) return word;
	if (word.endsWith("ing")) return word.slice(0, -3) + "in~";
	if (word.endsWith("ed")) return word.slice(0, -2) + "d~";
	if (word.endsWith("s")) return word + "ies";
	return word + "~";
}

function uwuifyWordWithPunct(word) {
	const punctMatch = word.match(/[\.,!?:;"')\]\}]+$/);
	const punct = punctMatch ? punctMatch[0] : "";
	const coreWord = punct ? word.slice(0, -punct.length) : word;
	const lower = coreWord.toLowerCase();

	function matchCase(original, replacement) {
		if (original === original.toUpperCase()) return replacement.toUpperCase();
		if (original[0] === original[0].toUpperCase()) {
			return replacement[0].toUpperCase() + replacement.slice(1);
		}
		return replacement;
	}

	let uwuified = uwuDictionary[lower];
	if (uwuified) {
		uwuified = matchCase(coreWord, uwuified);
	} else {
		uwuified = coreWord;
	}

	if (!uwuDictionary[coreWord] && !/^[\W\d_]+$/.test(coreWord)) {
		uwuified = uwuified
			.replace(/(?:r|l)/g, "w")
			.replace(/(?:R|L)/g, "W")
			.replace(/n([aeiou])/gi, "ny$1")
			.replace(/th/g, "d")
			.replace(/Th/g, "D")
			.replace(/TH/g, "D")
			.replace(/ove/g, "uv");

		if (uwuified === coreWord) {
			uwuified = softenWord(coreWord);
		}
	}

	return uwuified + punct;
}

function uwuify(text) {
	return text
		.split(/(\s+)/)
		.map(uwuifyWordWithPunct)
		.join("");
}

function uwuifyNodeText(node) {
	if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
		const parent = node.parentNode;
		if (!parent || parent.dataset.uwuified === "true") return;

		const text = node.textContent;
		if (!text || !/[a-zA-Z]/.test(text)) return;

		if (
			parent.closest("[contenteditable='true']") ||
			parent.closest("#fatweaks_faSettingsPage_settingsPage") ||
			parent.closest(".tags") ||
			parent.closest(".popup_date") ||
            parent.closest(".display-name-text") ||
			parent.closest(".message-bar-desktop") ||
			parent.closest(".mobile-notification-bar") ||
			(location.pathname.startsWith("/controls/") &&
				!parent.closest("#ddmenu") &&
				!parent.closest("#footer"))
		) return;

		const link = parent.closest("a");
		if (link && /\/(view|user)\//.test(link.getAttribute("href") || "")) return;

		if (parent.tagName === "INPUT" || parent.tagName === "TEXTAREA") return;

		node.textContent = uwuify(text);
		parent.dataset.uwuified = "true";
	}
	else if (node.nodeType === Node.ELEMENT_NODE) {
		if (
			["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "SVG", "CANVAS", "TEMPLATE"].includes(node.tagName) ||
			node.closest("[aria-hidden='true'], [role='presentation'], .icon, .emoji")
		) return;

		if (
			node.id === "fatweaks_faSettingsPage_settingsPage" ||
			node.id === "submission-title"
		) return;

		if (
			(node.tagName === "INPUT" || node.tagName === "TEXTAREA") &&
			node.placeholder &&
			!node.dataset.uwuifiedPlaceholder
		) {
			node.placeholder = uwuify(node.placeholder);
			node.dataset.uwuifiedPlaceholder = "true";
		}

		for (const child of node.childNodes) {
			uwuifyNodeText(child);
		}
	}
}

function uwuifyAllText() {
	uwuifyNodeText(document.body);

	const titleEl = document.querySelector("title");
	if (titleEl && titleEl.textContent.trim()) {
		titleEl.textContent = uwuify(titleEl.textContent);
	}

	const userIconBlock = document.querySelector("usericon-block-after");
	if (userIconBlock) {
		userIconBlock.querySelectorAll("[title]").forEach((el) => {
			const original = el.getAttribute("title");
			if (original && !el.dataset.uwuifiedTitle) {
				el.setAttribute("title", uwuify(original));
				el.dataset.uwuifiedTitle = "true";
			}
		});
	}
}

uwuifyAllText();

const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const node of mutation.addedNodes) {
			uwuifyNodeText(node);
		}

		if (
			mutation.type === "attributes" &&
			mutation.attributeName === "title"
		) {
			const el = mutation.target;
			if (
				el.closest("usericon-block-after") &&
				el.hasAttribute("title") &&
				!el.dataset.uwuifiedTitle
			) {
				el.setAttribute("title", uwuify(el.getAttribute("title")));
				el.dataset.uwuifiedTitle = "true";
			}
		}

		if (
			mutation.type === "attributes" &&
			mutation.attributeName === "placeholder"
		) {
			const el = mutation.target;
			if (
				(el.tagName === "INPUT" || el.tagName === "TEXTAREA") &&
				el.hasAttribute("placeholder") &&
				!el.dataset.uwuifiedPlaceholder
			) {
				el.setAttribute("placeholder", uwuify(el.getAttribute("placeholder")));
				el.dataset.uwuifiedPlaceholder = "true";
			}
		}
	}
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: true,
	attributeFilter: ["title", "placeholder"],
});