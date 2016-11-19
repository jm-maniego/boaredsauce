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