class Api::ResourceCollectionPresenter
  def initialize(collection)
    @collection = collection
  end

  def as_json(options={})
    options = options.merge({
      include: @collection.includes_values
      })
    include_root = options.fetch(:include_root, true)
    json_collection = @collection.map {|object| object.as_json(options) }
    if include_root
      {data: json_collection}
    else
      json_collection
    end
  end
end