class Api::ResourcePresenter
  class_attribute :allowed_attributes
  self.allowed_attributes = [] # Must be an array of string attributes

  class << self
    def attributes(*attributes)
      self.allowed_attributes = attributes
    end
  end

  class CollectionPresenter
    def initialize(collection)
      @collection = collection
    end

    def as_json(options={})
      json_collection = @collection.map {|object| object.resource_presenter.new(object).as_json(options) }
      {data: json_collection}
    end
  end

  def initialize(object)
    @object = object
  end

  def attributes(options={})
    @object.attributes.slice(*self.class.allowed_attributes.map(&:to_s)).as_json(options)
  end

  def as_json(options={})
    return CollectionPresenter.new(@object).as_json(options) if @object.respond_to?(:each)
    attributes(options)
  end
end