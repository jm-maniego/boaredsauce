class Boaredsauce.Routers.Polls extends Backbone.Router
  routes:
    '': 'index'

  initialize: ->
    @polls = new Boaredsauce.Collections.Polls()

  index: ->
    view  = new Boaredsauce.Views.PollsIndex(collection: @polls)
    @polls.fetch()
    $('#main-container').html(view.render().el)