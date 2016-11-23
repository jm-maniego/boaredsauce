window.Boaredsauce =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  Mixins: {}
  initialize: ->
    new Boaredsauce.Routers.Polls()
    new Boaredsauce.Routers.Users()
    Backbone.history.start(pushState: true)

$(document).ready ->
  Boaredsauce.initialize()
