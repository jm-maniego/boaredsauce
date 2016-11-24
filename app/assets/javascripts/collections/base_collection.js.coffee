class Boaredsauce.Collections.BaseCollection extends Backbone.Collection
  toJSON: (include_type=false) ->
    @map (model)->
      model.toJSON(include_type)