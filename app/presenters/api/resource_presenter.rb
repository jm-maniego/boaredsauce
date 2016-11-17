class Api::ResourcePresenter
  class CollectionPresenter
    def initialize(collection)
      @collection = collection
    end

    def as_json
      json_collection = @collection.map {|object| Api::ResourcePresenter.new(object).as_json }
      {data: json_collection}
    end
  end

  def initialize(object)
    @object = object
  end

  def as_json(options={})
    return CollectionPresenter.new(@object).as_json if @object.respond_to?(:each)
    @object.attributes.as_json
  end
end