## Constants

<dl>
<dt><a href="#__fatweaks">__fatweaks</a></dt>
<dd><p>Container for all FATweaks modules.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Module">Module</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="__fatweaks"></a>

## \_\_fatweaks
Container for all FATweaks modules.

**Kind**: global constant  

* [__fatweaks](#__fatweaks)
    * [.modules](#__fatweaks.modules)
    * [.reference(id, required)](#__fatweaks.reference)
    * [.namespace(id)](#__fatweaks.namespace)
    * [.assetURL(namespace, pathname)](#__fatweaks.assetURL)

<a name="__fatweaks.modules"></a>

### __fatweaks.modules
All registered modules.

**Kind**: static property of [<code>\_\_fatweaks</code>](#__fatweaks)  
<a name="__fatweaks.reference"></a>

### __fatweaks.reference(id, required)
References a plugin as a module in order to use its resources.

**Kind**: static method of [<code>\_\_fatweaks</code>](#__fatweaks)  

| Param | Description |
| --- | --- |
| id | The namespace of the plugin you wish to reference. |
| required | If this function should throw an error when the plugin is not found. |

**Example**  
```js
const example = __fatweaks.reference("example");

// quack or else
example.transformSiteToDuck();
```
**Example**  
```js
const example = __fatweaks.reference("example", false);

// quack if user wants me to
if (example) example.transformSiteToDuck();
```
<a name="__fatweaks.namespace"></a>

### __fatweaks.namespace(id)
Modulizes a plugin, so its resources can be used by other plugins.

**Kind**: static method of [<code>\_\_fatweaks</code>](#__fatweaks)  

| Param | Description |
| --- | --- |
| id | The namespace of your plugin. |

**Example**  
```js
const module = __fatweaks.namespace("example");

module.transformSiteToDuck = function() {...};
```
<a name="__fatweaks.assetURL"></a>

### __fatweaks.assetURL(namespace, pathname)
Returns a URL to an asset found under a namespace.

**Kind**: static method of [<code>\_\_fatweaks</code>](#__fatweaks)  

| Param | Description |
| --- | --- |
| namespace | The namespace where the asset is. |
| pathname | The path of the asset within the namespace. |

**Example**  
```js
let duck = __fatweaks.assetURL("example", "duck.jpg");
document.body.innerHTML = `<img src="${duck}" />`;
```
<a name="Module"></a>

## Module : <code>Object</code>
**Kind**: global typedef  
