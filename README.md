vue-loader-mixin
================

Preloader mixin for Vue.js (using PreloadJS)

## Usage

```js
var loaderMixin = require('vue-loader-mixin');

var root = new Vue({
    mixins: [loaderMixin],

    events: {
        'load:progress': 'onLoadProgress',
        'load:complete': 'onLoadComplete'
    },

    // Static manifest
    manifest: [
        // ...
    ],

    created: function() {
        // If you need to dynamically create the manifest
        this.$options.manifest = [
            // ...
        ];
    },

    ready: function() {
        // Explicit call
        this.startPreloader();
    },

    methods: {
        onLoadProgress: function(event) {
            this.progress = event.progress;
        },

        onLoadComplete: function(event) {
            this.progress = 1;
            // You can use the load:complete event with the `wait-for` directive
        }
    }
});

```

## Events
This mixin emits `load:start`, `load:progress`, `load:complete` and `load:error` on the target vm.