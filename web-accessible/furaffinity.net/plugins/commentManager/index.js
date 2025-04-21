/**
 * Gives data for all comments on the page.
 * @typedef {Object} CommentManagerModule
 */
let module = __fatweaks.namespace("commentManager");

class FACommentUser {
  /** @type {Element} */
  element;

  #avatar;
  #displayName;
  #userName;
  #commentIsOp;
  #userTitle;

  constructor(element) {
    this.element = element;

    this.#avatar = this.element.querySelector(".avatar");
    this.#displayName = this.element.querySelector("comment-username .js-displayName");
    this.#userName = this.element.querySelector("comment-username .js-userName-block > span")?.childNodes?.[1];

    if (this.#userName == null) throw "User can't be null";

    this.#commentIsOp = this.element.querySelector(".comment_op_marker");
    this.#userTitle = this.element.querySelector("comment-title");
  }

  /** @returns {boolean} */
  get admin() {
    return this.element.classList.contains("admin-comment");
  }

  /** @returns {boolean} */
  get op() {
    return this.#commentIsOp != null;
  }

  /** @returns {string} */
  get userLink() {
    return this.#avatar.querySelector("a").href;
  }

  /** @returns {string} */
  get userAvatar() {
    return this.#avatar.querySelector("img").src;
  }

  /** @returns {string} */
  get userAvatarAlt() {
    return this.#avatar.querySelector("img").alt;
  }

  /** @returns {string} */
  get displayname() {
    return this.#displayName.textContent.trim();
  }

  /** @returns {string} */
  get username() {
    return this.#userName.textContent.trim();
  }

  /** @returns {?string} */
  get title() {
    return this.#userTitle.textContent.trim();
  }
}
module.faCommentUser = FACommentUser;

class FACommentAction {
  /** @type {Element} */
  element;

  constructor(element) {
    this.element = element;
  }

  /** @returns {string} */
  get type() {
    return this.element.nodeName;
  }
  /** @returns {Element} */
  get linkElement() {
    return this.element.querySelector("a");
  }
  /** @returns {string} */
  get link() {
    return this.linkElement.href;
  }
}
module.faCommentAction = FACommentAction;

class FAComment {
  /** @type {Element} */
  element;

  /** @type {FACommentCollection} */
  collection;

  #commentAnchor;
  #commentIsEdited;
  #userName;
  #commentAnchorSuggestiveOfParentComment;
  #commentDate;
  #commentText;
  #commentFooter;

  constructor(element, collection) {
    this.element = element;
    this.collection = collection;
    this.#commentAnchor = this.element.querySelector(".comment_anchor");

    if (this.#commentAnchor == null) throw "Anchor can't be null";

    this.#commentIsEdited = this.element.querySelector("comment-username .edited-icon");
    this.#userName = this.element.querySelector("comment-username .js-userName-block > span")?.childNodes?.[1];

    if (this.#userName == null) throw "User can't be null";

    this.#commentAnchorSuggestiveOfParentComment = this.element.querySelector("comment-anchor")?.childNodes?.[3];
    if (this.#commentAnchorSuggestiveOfParentComment == null && this.element.querySelector("comment-anchor")) {
      let element = document.createComment(`<a class="comment-parent" href="#" title="Go to parent Comment">#parent</a>`);
      this.element.querySelector("comment-anchor").appendChild(element);
      this.#commentAnchorSuggestiveOfParentComment = element;
    }
    this.#commentDate = this.element.querySelector("comment-date .popup_date");
    this.#commentText = this.element.querySelector("comment-user-text > div") ?? this.element.querySelector("comment-user-text");

    if (this.#commentText == null) throw "Text can't be null";

    this.#commentFooter = this.element.querySelector("comment-footer");

    if (this.#commentFooter == null) throw "Footer can't be null";
  }

  /** @returns {FACommentUser} */
  get user() {
    let findingUsername = this.#userName.textContent.trim();

    let user = this.collection.collectionUsers.find(user => user.username === findingUsername)
      ?? new FACommentUser(this.element);

    return user;
  }

  /** @returns {Element} */
  get container() {
    return this.element.parentElement;
  }

  /** @returns {?FAComment} */
  get parent() {
    let parentCommentId;
    if (this.#commentAnchorSuggestiveOfParentComment)
      parentCommentId = this.#commentAnchorSuggestiveOfParentComment.textContent.match(/href="#(.*?)"/)?.[1];

    let parentCommentObject;
    if (parentCommentId)
      parentCommentObject = this.collection.collectionComments.find((comment) => comment.id === parentCommentId);

    return parentCommentObject;
  }

  /** @param {?FAComment} parentComment */
  set parent(parentComment) {
    console.log(parentComment);
    this.#commentAnchorSuggestiveOfParentComment.textContent =
      this.#commentAnchorSuggestiveOfParentComment.textContent.replace(/href="#.*?"/, `href="#${parentComment?.id ?? ""}"`);
    this.indent = parentComment ? (parentComment.indent + 1) : 0;
    if (parentComment) {
      this.element.remove();
      parentComment.element.after(this.element);
    }

    this.children.forEach(child => child.parent = this);
  }

  /** @returns {FAComment[]} */
  get children() {
    return this.collection.collectionComments.filter((comment) => comment.parent?.id == this.id);
  }

  /** @returns {string} */
  get id() {
    return this.#commentAnchor.id;
  }

  /** @returns {number} */
  get index() {
    return Array.from(this.container.children).indexOf(this.element);
  }

  /** @param {number} value */
  set index(value) {
    let container = this.container;
    this.element.remove();
    let childArray = Array.from(container.children);

    if (value <= 0) {
      container.prepend(this.element);
    }
    else if (value >= childArray.length) {
      container.append(this.element);
    }
    else {
      let elementAt = childArray.at(value);
      elementAt.before(this.element);
    }
  }

  /** @returns {number} */
  get indent() {
    let width = this.element.style.width;

    if (width == null) return 0;

    return (100 - parseInt(width)) / 3;
  }

  /** @param {number} value */
  set indent(value) {
    this.element.style.width = (100 - (value * 3)).toString() + "%";
  }

  /** @returns {boolean} */
  get edited() {
    return this.#commentIsEdited != null;
  }

  /** @returns {?string} */
  get postedRaw() {
    return this.#commentDate?.title;
  }

  /** @returns {?Date} */
  get postedDate() {
    return this.postedRaw ? new Date(this.postedRaw) : null;
  }

  /** @returns {?string} */
  get postedRelative() {
    return this.#commentDate?.textContent.trim();
  }

  /** @returns {string} */
  get content() {
    return this.#commentText.textContent.trim();
  }

  /** @param {string} value */
  set content(value) {
    this.#commentText.textContent = value;
  }

  /** @returns {string} */
  get contentHTML() {
    return this.#commentText.innerHTML;
  }

  /** @param {string} value */
  set contentHTML(value) {
    this.#commentText.innerHTML = value;
  }

  #myActions = [];

  /** @returns {string} */
  get actions() {
    let actionElements = Array.from(commentFooter.children);

    return actionElements.map(element => {
      let action = this.#myActions.find(action => action.element === element);

      if (action == null) {
        action = new FACommentAction(element);
        this.#myActions.push(action);
      }

      return action;
    });
  }
}
module.faComment = FAComment;

class FACommentCollection {
  element;

  /** @type {FACommentUser[]} */
  collectionUsers = [];
  /** @type {FAComment[]} */
  collectionComments = [];

  constructor(element) {
    this.element = element;

    let commentElements = this.element.querySelectorAll("& > .comment_container");

    commentElements.forEach((el) => {
      try {
        let comment = new FAComment(el, this);

        this.collectionComments.push(comment);
        this.collectionUsers.push(comment.user);
      } catch (err) { console.error(err) }
    });

    // let parentlessComments = this.collectionComments.filter(comment => comment.parent == null);
    // FACommentCollection.sort(parentlessComments, (x, y) => y.postedDate - x.postedDate);
  }

  /** 
   * @param {FAComment[]} collection 
   * @param {function (FAComment, FAComment): number} formula 
   */
  static sort(collection, formula = (x, y) => x.postedDate - y.postedDate) {

    collection.sort(formula);

    collection.forEach((comment) => {
      comment.index = 9999;

      FACommentCollection.sort(comment.children, formula);
    });
  }
}
module.faCommentCollection = FACommentCollection;