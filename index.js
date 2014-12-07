'use strict';

var preloadjs = require('preloadjs');

module.exports = {
    /*
        Properly stop & destroy the loader
     */
    beforeDestroy: function() {
        if(this.preloader) {
            this.preloader.setPaused(true);
            this.preloader.off();
            this.preloader.removeAll();
            this.preloader.close();
            this.preloader = null;
        }
    },

    methods: {
        load: function() {
            var manifest = this.$options.manifest;

            this.preloader = new createjs.LoadQueue();
            this.preloader.on('error', this._onLoadError);
            this.preloader.on('complete', this._onLoadComplete);
            this.preloader.on('complete', this._onLoadComplete);
            this.$emit('load:start');
            this.preloader.loadManifest(manifest);
        },

        _onLoadProgress: function(event) {
            this.$emit('load:progress', event);
        },

        _onLoadComplete: function(event) {
            this.$emit('load:complete', event);
        },

        _onLoadError: function(event) {
            this.$emit('load:error', event);
        }
    }
};