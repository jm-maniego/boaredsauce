class Boaredsauce.Models.User extends Boaredsauce.Models.BaseModel
  fullname: ->
    "#{@get('first_name')} #{@get('last_name')}"