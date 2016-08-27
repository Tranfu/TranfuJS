
// https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
// https://github.com/phiggins42/bloody-jquery-plugins/blob/55e41df9bf08f42378bb08b93efcb28555b61aeb/pubsub.js

export default function eventemitter() {

  this.cache = {};

  this.on = function (topic, callback) {
    if (!this.cache[topic]) this.cache[topic] = [];
    this.cache[topic].push(callback);
  };

  this.emit = function (topic, args = [], scope = this) {
    if (this.cache[topic]) {
      this.cache[topic].forEach(callback => {
        callback.apply(scope, args);
      });
    }
  };
}
