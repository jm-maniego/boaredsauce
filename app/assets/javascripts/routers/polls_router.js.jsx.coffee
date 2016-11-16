class Boaredsauce.Routers.Polls extends Backbone.Router
  routes:
    '': 'index'

  initialize: ->
    @polls = Boaredsauce.polls || new Boaredsauce.Collections.Polls()

  index: ->
    view  = new Boaredsauce.Views.PollsIndex(collection: @polls)
    @polls.this_or_fetch()
    $('#main-container').html(view.render().el)