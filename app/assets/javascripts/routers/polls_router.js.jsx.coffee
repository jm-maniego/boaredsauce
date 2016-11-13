class Boaredsauce.Routers.Polls extends Backbone.Router
  routes:
    '': 'index'

  index: ->
    polls = new Boaredsauce.Collections.Polls()
    polls.fetch
      success: =>
        ReactDOM.render(
          `<Boaredsauce.Views.PollList polls={polls}/>`,
          document.getElementById('main-container')
          )
