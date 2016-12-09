class Boaredsauce.Models.PollChoice extends Backbone.Model
  answer: ->
    @save(
      {'answered': true},
        url: Routes.answer_api_poll_choice_path(@get('id'))
        method: "POST")
