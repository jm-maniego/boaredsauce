module ApiPresentable
  extend ActiveSupport::Concern

  included do
    def resource_presenter
      "Api::#{self.class}Presenter".constantize
    end

    alias_method :serializable_hash_without_presenter, :serializable_hash
    def serializable_hash(options=nil)
      resource_presenter.new(self).as_json(options)
    end
  end

  module Collection
    extend ActiveSupport::Concern

    included do
      def as_json(options={})
        Api::ResourceCollectionPresenter.new(self).as_json(options)
      end
    end
  end
end