'use strict';

Function.prototype.bind = require("function-bind"); // testling / phantom shit
var test = require('tape');
var loaderMixin = require('../index.js');
var Vue = require('vue');

test('Load a file', function(assert) {
    var root = new Vue({
        el: 'body',
        mixins: [loaderMixin],
        manifest: [
            './test/logo.png'
        ],
        events: {
            'load:start': 'loadStart',
            'load:progress': 'loadProgress',
            'load:complete': 'loadComplete'
        },
        methods: {
            loadStart: function() {
                assert.pass('start event called');
            },

            loadProgress: function(event) {
                assert.pass('progress event called', event.progress);
            },

            loadComplete: function() {
                assert.pass('complete event called');
                assert.end();
            }
        },

        ready: function() {
            this.load();
        }
    });
});