extensions =
  sync: (method, model, options) ->
    options = options || {};
    options.headers = { Accept: 'application/vnd.api+json' }
    return Backbone.sync(method, model, options)

collection_extensions =
  parse: (response) ->
    response.data

model_extensions =
  parse: (response) ->
    attributes = response.attributes
    _.extend(attributes,
      id: response.id,
      type: response.type,
      url: response.links.self)
    attributes

_.extend(Backbone.Collection.prototype, extensions)
_.extend(Backbone.Model.prototype, extensions)
_.extend(Backbone.Collection.prototype, collection_extensions)
_.extend(Backbone.Model.prototype, model_extensions)