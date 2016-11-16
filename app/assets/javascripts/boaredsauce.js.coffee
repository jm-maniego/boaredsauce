window.Boaredsauce =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  Mixins: {}
  DataTypes: {
    date: ['created_at', 'created-at']
  }
  initialize: ->
    new Boaredsauce.Routers.Polls()
    Backbone.history.start(pushState: true)

    $(document).on "click", "a:not([data-bypass])", (evt) ->
      href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
      root = location.protocol + "//" + location.host + Backbone.history.options.root;

      if (href.prop && href.prop.slice(0, root.length) == root)
        evt.preventDefault();
        Backbone.history.navigate(href.attr, {trigger: true});

$(document).ready ->
  Boaredsauce.initialize()
