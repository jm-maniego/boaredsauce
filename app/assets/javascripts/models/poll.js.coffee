class Boaredsauce.Models.Poll extends Boaredsauce.Models.BaseModel
  type: 'poll'
  belongs_to: ['user']
  has_many: ['poll_choices']
  urlRoot: "/api/polls"
  @limit: 145
  poll_choices_limit: 10

  build_poll_choices: ->
    @set 'poll_choices', new Boaredsauce.Collections.PollChoices([
      {text: ""},
      {text: ""},
      {text: ""}])
    @get('poll_choices')
  answer: (poll_choice_id, answer_bool) ->
    @save(null, {
      url: Routes.answer_api_poll_path(@get('id')),
      method: {true: "POST", false: "DELETE"}[answer_bool],
      dataType: "json",
      attrs: {poll_choice_id: poll_choice_id}
      })