//DOM events are signals fired by the browser when something happens (like a click, key press, or page load), and you can attach JavaScript code to respond to them. 

import { EventEmitter } from 'node:events';

function createDomEvent() {
    const emitter = new EventEmitter();

    return {
        addEventListener(eventType, listener) {
            emitter.on(eventType, listener);
        },

        removeEventListener(eventType, listener) {
            emitter.off(eventType, listener);
        },

        dispatchEvent(event) {
            event.target = this;
            event.currentTarget = this;
            emitter.emit(event.eventType, event);
        }
    };
}

// Create a "button" object with our custom event system
// agr samee event ayega 
const button = createDomEvent();

// Add a "save" listener
button.addEventListener("save", () => {
    console.log("saving...");
});

// // Define a click handler
    function handleClick(event) {
    }
    //   console.log("Button Clicked!");
    //   console.log("Event:", event);
    //  }

// // Attach the click handler
 button.addEventListener("click", handleClick);

// // Dispatch events
 button.dispatchEvent({
    eventType: "save"
});

// button.dispatchEvent({
//     eventType: "click",
//     detail: "this is the click dispatch"
// });

// Another "save" listener
button.addEventListener("save", () => {
    console.log("second save listener triggered!");
});

// Another "click" listener
button.addEventListener("click", (event) => {
    console.log("another click listener fired!", event.detail);
});

// Dispatch events again
button.dispatchEvent({ eventType: "save" });
// Output:
// saving...
// second save listener triggered!

button.dispatchEvent({ eventType: "click", detail: "finishhh" });
// Output:
// another click listener fired! extra info
