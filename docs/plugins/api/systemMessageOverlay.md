<a name="SystemMessageOverlayPlugin"></a>

## SystemMessageOverlayPlugin : <code>Object</code>
System Message Overlay by MeowcaTheoRange

**Kind**: global typedef  

* [SystemMessageOverlayPlugin](#SystemMessageOverlayPlugin) : <code>Object</code>
    * [.closeSysMessage(e)](#SystemMessageOverlayPlugin.closeSysMessage)
    * ["displayed"](#SystemMessageOverlayPlugin.event_displayed)
    * ["hidden"](#SystemMessageOverlayPlugin.event_hidden)

<a name="SystemMessageOverlayPlugin.closeSysMessage"></a>

### SystemMessageOverlayPlugin.closeSysMessage(e)
Closes the system message that contains the clicked element.

**Kind**: static method of [<code>SystemMessageOverlayPlugin</code>](#SystemMessageOverlayPlugin)  

| Param | Type |
| --- | --- |
| e | <code>MouseEvent</code> | 

<a name="SystemMessageOverlayPlugin.event_displayed"></a>

### "displayed"
Fires when System Message Overlay displays a System Message.

**Kind**: event emitted by [<code>SystemMessageOverlayPlugin</code>](#SystemMessageOverlayPlugin)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | The container for the floating System Message. |
| hrefURL | <code>URL</code> | The URL where the System Message came from. |

<a name="SystemMessageOverlayPlugin.event_hidden"></a>

### "hidden"
Fires when System Message Overlay closes a System Message.

**Kind**: event emitted by [<code>SystemMessageOverlayPlugin</code>](#SystemMessageOverlayPlugin)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | The container for the floating System Message. |

