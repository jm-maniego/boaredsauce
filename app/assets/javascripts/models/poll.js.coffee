class Boaredsauce.Models.Poll extends Boaredsauce.Models.BaseModel
  type: 'poll'
  belongs_to: ['user']
  has_many: ['poll_choices']
  @limit: 145
  poll_choices_limit: 10

  build_poll_choices: ->
    @set 'poll_choices', new Boaredsauce.Collections.PollChoices([
      {text: ""},
      {text: ""},
      {text: ""}])
    @get('poll_choices')
