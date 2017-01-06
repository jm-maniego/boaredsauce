module Api
  class PollChoicePresenter < ResourcePresenter
    attributes :id, :text

    def as_json(options={})
      current_user = context
      respondents_count = @object.responses.size
      answered = @object.responses.any? {|res| res.respondent_id == current_user.id}
      super.merge({
        answered: answered,
        respondents_count: respondents_count
        })
    end
  end
end