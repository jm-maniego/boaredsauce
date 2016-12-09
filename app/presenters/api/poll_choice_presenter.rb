module Api
  class PollChoicePresenter < ResourcePresenter
    attributes :id, :text

    def as_json(options={})
      respondents_hash = @object.respondents.as_json(include_root: false)
      answered = respondents_hash.any? {|h| h["id"] == context.id}
      super.merge({
        answered: answered,
        respondents: respondents_hash
        })
    end
  end
end