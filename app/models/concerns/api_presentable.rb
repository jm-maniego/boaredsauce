module ApiPresentable
  extend ActiveSupport::Concern

  included do
    def resource_presenter
      "Api::#{@klass || self.class}Presenter".constantize
    end

    def as_json(options={})
      resource_presenter.new(self).as_json
    end
  end
end