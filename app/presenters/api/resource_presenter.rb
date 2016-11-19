class Api::ResourcePresenter
  class_attribute :allowed_attributes
  self.allowed_attributes = [] # Must be an array of string attributes

  class << self
    def attributes(*attributes)
      self.allowed_attributes = attributes
    end
  end

  def initialize(object)
    @object = object
  end

  def as_json(options={})
    options = (options||{}).merge({
      only: klass.allowed_attributes
      })
    @object.serializable_hash_without_presenter(options)
  end

  def klass
    self.class
  end
end

class Api::ResourcePresenter::CollectionPresenter
  def initialize(collection)
    @collection = collection
  end

  def as_json(options={})
    options = options.merge({
      include: @collection.includes_values
      })
    json_collection = @collection.map {|object| object.as_json(options) }
    {data: json_collection}
  end
end