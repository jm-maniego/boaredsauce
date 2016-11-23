class Boaredsauce.Routers.Users extends Backbone.Router
  routes:
    'users/:id': 'show'

  show: (id) ->
    view = new Boaredsauce.Views.UserShow({model: Boaredsauce.current_user})
    $('#main-container').html(view.render().el)