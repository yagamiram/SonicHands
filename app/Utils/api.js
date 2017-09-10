var axios = require('axios');
module.exports = {
  fetchCoordinates: function () {
    var encodeURI = window.encodeURI('https://api-m2x.att.com/v2/devices/94b177d7f116f44cf373b9dae7e0b0de/streams/coordinatesForSonicData/values')
    return axios.get(encodeURI, {
      headers: { 'x-m2x-key': '7efd78739762999168565cacb8be97e6' }
    }).then(function (response) {
      console.log("the response for the python web server is", response)
      return response;
    })
  },
  anotherfunction: function() {

  },
  simulate: function (element, eventName) {
    var eventMatchers = {
        'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
        'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
    }
    var defaultOptions = {
        pointerX: 0,
        pointerY: 0,
        button: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true
    }
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;
    function extend(destination, source) {
     for (var property in source)
       destination[property] = source[property];
     return destination;
     }
    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
  }
}
