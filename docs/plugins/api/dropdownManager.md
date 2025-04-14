<a name="DropdownManagerModule"></a>

## DropdownManagerModule : <code>Module</code>
The system that FurAffiniTweaks uses to create entries in the Settings dropdown. This is one of the base modules that can't be unloaded.

**Kind**: global typedef  
<a name="DropdownManagerModule.createDropdownEntry"></a>

### DropdownManagerModule.createDropdownEntry(name, href, onclick)
Gets all the registered namespaces.

**Kind**: static method of [<code>DropdownManagerModule</code>](#DropdownManagerModule)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The title of the dropdown. |
| href | <code>string</code> | Where the dropdown entry will go when clicked. |
| onclick | <code>function</code> \| <code>null</code> | The event the dropdown entry will fire when clicked. Can override. |

**Example**  
```js
const dropdownManager = __fatweaks.reference("dropdownManager");dropdownManager.createDropdownEntry("Turn into Duck", "#", module.transformSiteToDuck);
```
