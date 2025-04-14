<a name="SettingsModule"></a>

## SettingsModule : <code>Module</code>
The system that FurAffiniTweaks uses to manage plugin settings. This is one of the base modules that can't be unloaded.
Go to `.register()` if you'd like to find out how to give your plugin settings.

**Kind**: global typedef  

* [SettingsModule](#SettingsModule) : <code>Module</code>
    * [.getNSes()](#SettingsModule.getNSes) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getNSName(namespace)](#SettingsModule.getNSName) ⇒ <code>string</code>
    * [.getNSSettings(namespace)](#SettingsModule.getNSSettings) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getNSSetting(namespace, id)](#SettingsModule.getNSSetting) ⇒ <code>Setting.&lt;any&gt;</code>
    * [.setNSSetting(namespace, id, value)](#SettingsModule.setNSSetting)
    * [.saveNSes()](#SettingsModule.saveNSes)
    * [.register(obj)](#SettingsModule.register) ⇒ <code>RegisteredNamespace</code>
    * ["namespaceRegistered"](#SettingsModule.event_namespaceRegistered)
    * [.Setting](#SettingsModule.Setting) : <code>Object</code>
    * [.RegisteredNamespace](#SettingsModule.RegisteredNamespace) : <code>Object</code>
        * [.boolean(obj)](#SettingsModule.RegisteredNamespace.boolean) ⇒ <code>boolean</code>
        * [.number(obj)](#SettingsModule.RegisteredNamespace.number) ⇒ <code>number</code>
        * ["namespaceFieldRegistered"](#SettingsModule.RegisteredNamespace.event_namespaceFieldRegistered)

<a name="SettingsModule.getNSes"></a>

### SettingsModule.getNSes() ⇒ <code>Array.&lt;string&gt;</code>
Gets all the registered namespaces.

**Kind**: static method of [<code>SettingsModule</code>](#SettingsModule)  
**Example**  
```js
const settings = __fatweaks.reference("settings");

// ["loader", "liveStatus", etc...]
console.log(settings.getNSes());
```
<a name="SettingsModule.getNSName"></a>

### SettingsModule.getNSName(namespace) ⇒ <code>string</code>
Gets the name of a registered namespace.

**Kind**: static method of [<code>SettingsModule</code>](#SettingsModule)  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | The registered namespace's ID. |

**Example**  
```js
const settings = __fatweaks.reference("settings");

// "Toggle Plugins"
console.log(settings.getNSName("loader"));
```
<a name="SettingsModule.getNSSettings"></a>

### SettingsModule.getNSSettings(namespace) ⇒ <code>Array.&lt;string&gt;</code>
Gets the setting keys on a registered namespace.

**Kind**: static method of [<code>SettingsModule</code>](#SettingsModule)  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | The registered namespace's ID. |

<a name="SettingsModule.getNSSetting"></a>

### SettingsModule.getNSSetting(namespace, id) ⇒ <code>Setting.&lt;any&gt;</code>
Gets a setting on a registered namespace.

**Kind**: static method of [<code>SettingsModule</code>](#SettingsModule)  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | The registered namespace's ID. |
| id | <code>string</code> | The ID of the setting. |

**Example**  
```js
const settings = __fatweaks.reference("settings");

// false
console.log(settings.getNSSetting("loader", "liveStatus"));
```
<a name="SettingsModule.setNSSetting"></a>

### SettingsModule.setNSSetting(namespace, id, value)
Modifies the value of a setting on a registered namespace.

**Kind**: static method of [<code>SettingsModule</code>](#SettingsModule)  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | The registered namespace's ID. |
| id | <code>string</code> | The ID of the setting. |
| value | <code>T</code> | The value you want to set the setting to. |

<a name="SettingsModule.saveNSes"></a>

### SettingsModule.saveNSes()
Saves all settings to localStorage.

**Kind**: static method of [<code>SettingsModule</code>](#SettingsModule)  
<a name="SettingsModule.register"></a>

### SettingsModule.register(obj) ⇒ <code>RegisteredNamespace</code>
Registers a namespace in the settings index.

**Kind**: static method of [<code>SettingsModule</code>](#SettingsModule)  
**Emits**: [<code>namespaceRegistered</code>](#SettingsModule.event_namespaceRegistered)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| obj.name | <code>string</code> | 
| obj.namespace | <code>string</code> | 

**Example**  
```js
const settings = __fatweaks.reference("settings");

let mySettings = settings.register({
  name: "TF the site into a duck",
  namespace: "example"
});
```
<a name="SettingsModule.event_namespaceRegistered"></a>

### "namespaceRegistered"
Fires when a namespace registers itself to have settings.

**Kind**: event emitted by [<code>SettingsModule</code>](#SettingsModule)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name that the namespace goes by in a menu. |
| namespace | <code>string</code> | The namespace that registered. |

<a name="SettingsModule.Setting"></a>

### SettingsModule.Setting : <code>Object</code>
**Kind**: static typedef of [<code>SettingsModule</code>](#SettingsModule)  
**Properties**

| Name | Type |
| --- | --- |
| type | <code>string</code> | 
| name | <code>string</code> | 
| description | <code>string</code> | 
| currentValue | <code>T</code> | 
| defaultValue | <code>T</code> | 
| authors | <code>Array.&lt;string&gt;</code> | 

<a name="SettingsModule.RegisteredNamespace"></a>

### SettingsModule.RegisteredNamespace : <code>Object</code>
**Kind**: static typedef of [<code>SettingsModule</code>](#SettingsModule)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of this namespace. |
| settings | <code>Object.&lt;string, Setting.&lt;any&gt;&gt;</code> | The settings this namespace has. |


* [.RegisteredNamespace](#SettingsModule.RegisteredNamespace) : <code>Object</code>
    * [.boolean(obj)](#SettingsModule.RegisteredNamespace.boolean) ⇒ <code>boolean</code>
    * [.number(obj)](#SettingsModule.RegisteredNamespace.number) ⇒ <code>number</code>
    * ["namespaceFieldRegistered"](#SettingsModule.RegisteredNamespace.event_namespaceFieldRegistered)

<a name="SettingsModule.RegisteredNamespace.boolean"></a>

#### RegisteredNamespace.boolean(obj) ⇒ <code>boolean</code>
Defines a setting that takes a boolean as an input.

**Kind**: static method of [<code>RegisteredNamespace</code>](#SettingsModule.RegisteredNamespace)  
**Returns**: <code>boolean</code> - The current value of the setting in localStorage, or defaultValue if unset.  
**Emits**: [<code>namespaceFieldRegistered</code>](#SettingsModule.RegisteredNamespace.event_namespaceFieldRegistered)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> |  |
| obj.id | <code>string</code> | The id of the setting. |
| obj.name | <code>string</code> | The name the setting will show. |
| obj.shortDescription | <code>string</code> | The description of what the setting does. |
| obj.authors | <code>Array.&lt;string&gt;</code> | Who made the function that the setting affects (used for plugin toggles) |
| obj.defaultValue | <code>boolean</code> | The default value the setting will have if unset. |

**Example**  
```js
const settings = __fatweaks.reference("settings");

let mySettings = settings.register({
  name: "TF the site into a duck",
  namespace: "example"
});
let shouldQuackLoudly = mySettings.boolean({
  id: "shouldQuackLoudly",
  name: "If the site should quack upon being TFed into a duck",
  defaultValue: true
});

// true
console.log(shouldQuackLoudly);
```
<a name="SettingsModule.RegisteredNamespace.number"></a>

#### RegisteredNamespace.number(obj) ⇒ <code>number</code>
Defines a setting that takes a number as an input.

**Kind**: static method of [<code>RegisteredNamespace</code>](#SettingsModule.RegisteredNamespace)  
**Returns**: <code>number</code> - The current value of the setting in localStorage, or defaultValue if unset.  
**Emits**: [<code>namespaceFieldRegistered</code>](#SettingsModule.RegisteredNamespace.event_namespaceFieldRegistered)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> |  |
| obj.id | <code>string</code> | The id of the setting. |
| obj.name | <code>string</code> | The name the setting will show. |
| obj.shortDescription | <code>string</code> | The description of what the setting does. |
| obj.authors | <code>Array.&lt;string&gt;</code> | Who made the function that the setting affects (used for plugin toggles) |
| obj.defaultValue | <code>number</code> | The default value the setting will have if unset. |

**Example**  
```js
const settings = __fatweaks.reference("settings");

let mySettings = settings.register({
  name: "TF the site into a duck",
  namespace: "example"
});
let quackLoudlyVolume = mySettings.number({
  id: "quackLoudlyVolume",
  name: "How loud (in dB) the duck should quack",
  defaultValue: 500
});

// 500
console.log(quackLoudlyVolume);
```
<a name="SettingsModule.RegisteredNamespace.event_namespaceFieldRegistered"></a>

#### "namespaceFieldRegistered"
Fires when a namespace registers a setting.

**Kind**: event emitted by [<code>RegisteredNamespace</code>](#SettingsModule.RegisteredNamespace)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name that the namespace goes by in a menu. |
| namespace | <code>string</code> | The namespace that registered. |
| type | <code>string</code> | The type you should expect the setting to be. |
| id | <code>string</code> | The ID of the setting. |
| fieldName | <code>string</code> | The name that the setting goes by in a menu. |
| description | <code>string</code> | The description of the setting. |
| authors | <code>Array.&lt;string&gt;</code> | The authors of the function that the setting controls. |
| currentValue | <code>any</code> | The current value of the setting in localStorage, or defaultValue if unset. |
| defaultValue | <code>any</code> | The value of the setting when unset. |

