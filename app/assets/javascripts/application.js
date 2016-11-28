// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require js-routes
//= require jquery
//= require bootstrap
//= require jquery_ujs
//= require underscore
//= require backbone
//= require boaredsauce
//= require react
//= require react_ujs
//= require jquery-deparam.min
//= require jquery.timeago
//= require_tree ./mixins
//= require components
//= require_tree ./extensions
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./routers
//= require_tree .

$(document).ready(function() {
  $("time.timeago").timeago();
});

$(document).on("click", "a:not([data-bypass])", function(evt) {
  var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
  var root = location.protocol + "//" + location.host + Backbone.history.options.root;

  if (href.prop && href.prop.slice(0, root.length) == root) {
    evt.preventDefault();
    Backbone.history.navigate(href.attr, {trigger: true});
  }
})