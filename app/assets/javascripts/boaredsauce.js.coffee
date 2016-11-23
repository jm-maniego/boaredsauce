window.Boaredsauce =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  Mixins: {}
  initialize: ->
    new Boaredsauce.Routers.Polls()
    Backbone.history.start(pushState: true)

$(document).ready ->
  Boaredsauce.initialize()
