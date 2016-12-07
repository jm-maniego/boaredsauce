class Boaredsauce.Models.User extends Boaredsauce.Models.BaseModel
  urlRoot: '/api/users'
  has_many: ['polls']
  fullname: ->
    "#{@get('first_name')} #{@get('last_name')}"

  build_polls: ->
    @set 'polls', new Boaredsauce.Collections.Polls()