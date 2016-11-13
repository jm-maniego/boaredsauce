class Boaredsauce.Routers.Polls extends Backbone.Router
  routes:
    '': 'index'

  index: ->
    ReactDOM.render(
      `<Boaredsauce.Views.PollList>`)