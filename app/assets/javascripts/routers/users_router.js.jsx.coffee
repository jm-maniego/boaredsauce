class Boaredsauce.Routers.Users extends Backbone.Router
  routes:
    'users/:id': 'show'

  show: (id) ->
    user = new Boaredsauce.Models.User({id: id})
    view = new Boaredsauce.Views.UserShow({model: user})
    user.fetch(success: ->
      $('#main-container').html(view.render().el)
    );