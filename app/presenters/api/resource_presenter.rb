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

  def initialize(object, context)
    @object = object
    @context = context
  end

  def as_json(options={})
    context_option = options.slice(:context)
    included_associations = [*options.fetch(:include, [])] + klass.included_associations
    included_associations = included_associations.map do |key|
      key.merge(context_option)
    end

    options = options.merge({
      only: klass.allowed_attributes,
      include: included_associations
      })
    @object.serializable_hash_without_presenter(options)
  end

  def klass
    self.class
  end

  def context
    @context
  end
end