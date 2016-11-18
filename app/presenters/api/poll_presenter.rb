module Api
  class PollPresenter < ResourcePresenter
    attributes :id, :text, :created_at

    def attributes(options={})
      super.merge({
        user: @object.user.as_json(options)
        })
    end
  end
end