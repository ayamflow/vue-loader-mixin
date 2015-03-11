'use strict';

var Loader = require('resource-loader');

module.exports = {
    /*
        Properly stop & destroy the loader
     */
    beforeDestroy: function() {
        if(this.loader) {
            this.loader.removeAllListeners();
            this.loader.reset();
            this.loader = null;
        }
    },

    methods: {
        load: function() {
            var manifest = this.$options.manifest;

            var loader = new Loader();
            loader.on('error', this._onLoadError);
            loader.on('progress', this._onLoadProgress);
            loader.on('complete', this._onLoadComplete);

            manifest.forEach(function(file) {
                loader.add(file, file);
            });

            loader.load();
            this.$emit('load:start');

            this.loader = loader;
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