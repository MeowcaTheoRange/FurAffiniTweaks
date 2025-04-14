<a name="EventsModule"></a>

## EventsModule : <code>Module</code>
The system that FurAffiniTweaks uses to help plugins communicate with each other. This is one of the base modules that can't be unloaded.
Go to `.pushEvent()` and `.listenToEvent()` if you'd like to find out how to make your plugins communicate.

**Kind**: global typedef  

* [EventsModule](#EventsModule) : <code>Module</code>
    * [.pushEvent(namespace, eventName, detail, fromElement)](#EventsModule.pushEvent)
    * [.listenToEvent(namespace, eventName, callback, fromElement)](#EventsModule.listenToEvent)
    * [.switchLatch()](#EventsModule.switchLatch)

<a name="EventsModule.pushEvent"></a>

### EventsModule.pushEvent(namespace, eventName, detail, fromElement)
Pushes (fires) an event to other plugins under a namespace and a name.

**Kind**: static method of [<code>EventsModule</code>](#EventsModule)  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | The firing namespace's ID. |
| eventName | <code>string</code> | The name of the event that's being fired. Should be consistent between firings. |
| detail | <code>any</code> | Data that will be passed to listening events. |
| fromElement | <code>HTMLElement</code> | The element the event will be fired from (defaults to the DOM body). |

**Example**  
```js
const events = __fatweaks.reference("events");

module.quackDuck = function() {
  quack.play();
  events.pushEvent("example", "quack", quackLoudlyVolume);
}
```
<a name="EventsModule.listenToEvent"></a>

### EventsModule.listenToEvent(namespace, eventName, callback, fromElement)
Listens to an event fired by another or this plugin.

**Kind**: static method of [<code>EventsModule</code>](#EventsModule)  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | The firing namespace's ID. |
| eventName | <code>string</code> | The name of the event that's being fired. |
| callback | <code>function</code> | The callback that will run when the event is fired. |
| callback.detail | <code>Object.&lt;string, any&gt;</code> | The data passed from the firing plugin. |
| fromElement | <code>HTMLElement</code> | The element where the event will be listened to (defaults to the DOM body). |

**Example**  
```js
const events = __fatweaks.reference("events");

events.listenToEvent("example", "quack", (dbVolume) => {
  if (dbVolume > 10)
    console.log("That was loud!");
  else console.log("What was that?");
});
```
<a name="EventsModule.switchLatch"></a>

### EventsModule.switchLatch()
A latch that executes any awaiting event firings once all of the plugins are loaded, so all plugins get a chance to recieve any early firings of the event they're listening to.

You should not run this function in your plugin under any circumstance.

**Kind**: static method of [<code>EventsModule</code>](#EventsModule)  
