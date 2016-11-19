class Api::ResourceCollectionPresenter
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