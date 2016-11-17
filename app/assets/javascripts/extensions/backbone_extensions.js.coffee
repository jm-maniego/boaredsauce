extensions = {}
collection_extensions =
  parse: (response)->
    response.data

model_extensions = {}


_.extend(Backbone.Collection.prototype, extensions)
_.extend(Backbone.Collection.prototype,
  collection_extensions,
  Boaredsauce.Mixins.Finder)

_.extend(Backbone.Model.prototype, extensions)
_.extend(Backbone.Model.prototype, model_extensions)