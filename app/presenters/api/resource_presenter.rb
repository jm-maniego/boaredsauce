class Api::ResourcePresenter
  class_attribute :allowed_attributes, :included_associations
  self.allowed_attributes = [] # Must be an array of string attributes
  self.included_associations = []

  class << self
    def attributes(*attributes)
      self.allowed_attributes = attributes
    end

    def includes(*association)
      self.included_associations += association
    end
  end

  def initialize(object)
    @object = object
  end

  def as_json(options={})
    included_associations = [*options.fetch(:include, [])]
    options = (options||{}).merge({
      only: klass.allowed_attributes,
      include: included_associations + klass.included_associations
      })
    @object.serializable_hash_without_presenter(options)
  end

  def klass
    self.class
  end
end