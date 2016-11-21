class Api::ResourcePresenter
  class_attribute :allowed_attributes, :belongs_to_associations
  self.allowed_attributes = [] # Must be an array of string attributes
  self.belongs_to_associations = []

  class << self
    def attributes(*attributes)
      self.allowed_attributes = attributes
    end

    def belongs_to(association=nil)
      self.belongs_to_associations += [association]
    end
  end

  def initialize(object)
    @object = object
  end

  def as_json(options={})
    options = (options||{}).merge({
      only: klass.allowed_attributes,
      include: klass.belongs_to_associations
      })
    @object.serializable_hash_without_presenter(options)
  end

  def klass
    self.class
  end
end