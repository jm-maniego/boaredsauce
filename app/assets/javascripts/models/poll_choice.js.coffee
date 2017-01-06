class Boaredsauce.Models.PollChoice extends Backbone.Model
  answer: (answer_bool)->
    # @attributes.respondents_count += {true: 1, false: -1}[answer_bool]
    @set('answered', answer_bool)
    # @save(null,
    #   url: Routes.answer_api_poll_choice_path(@get('id')),
    #   method: {true: 'POST', false: "DELETE"}[answer_bool]
    #   )
