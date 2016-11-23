class Boaredsauce.Views.UserShow extends Boaredsauce.Views.BaseView
  component: ->
    user = @model
    `<UserScreen model={user}/>`