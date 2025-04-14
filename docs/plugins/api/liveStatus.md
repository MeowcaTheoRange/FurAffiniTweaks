<a name="LiveStatusPlugin"></a>

## LiveStatusPlugin : <code>Object</code>
Live Status by MeowcaTheoRange

**Kind**: global typedef  

* [LiveStatusPlugin](#LiveStatusPlugin) : <code>Object</code>
    * ["updated"](#LiveStatusPlugin.event_updated)
    * ["changed"](#LiveStatusPlugin.event_changed)

<a name="LiveStatusPlugin.event_updated"></a>

### "updated"
Fires when Live Status updates the notification text.

**Kind**: event emitted by [<code>LiveStatusPlugin</code>](#LiveStatusPlugin)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| notifs | <code>string</code> | The notification text as a string (e.x. `"2S 3F 4W 5J"`). |
| desktop_element | <code>Element</code> | The desktop notification text element. |
| mobile_element | <code>Element</code> | The mobile notification text element. |

<a name="LiveStatusPlugin.event_changed"></a>

### "changed"
Fires when the notification status has changed its state.

**Kind**: event emitted by [<code>LiveStatusPlugin</code>](#LiveStatusPlugin)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| notifs | <code>string</code> | The notification text as a string (e.x. `"2S 3F 4W 5J"`). |
| desktop_element | <code>Element</code> | The desktop notification text element. |
| mobile_element | <code>Element</code> | The mobile notification text element. |

