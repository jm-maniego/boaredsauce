class Boaredsauce.Models.BaseModel extends Backbone.Model
  belongs_to: {}

  set: (attributes, options)->
    super
    if model_attributes = attributes.attributes
      @attributes = model_attributes
    association_mapping = {
      'Models': @belongs_to,
      'Collections': @has_many
    }
    _.each(association_mapping, ((associations, association_type)->
      _.each(associations, ((association_str) ->
        association_class_str = _(association_str).classify()
        association_class = Boaredsauce[association_type][association_class_str]
        @attributes[association_str] = new association_class(attributes[association_str])
      ), this)
    ), this)

  toJSON: ->
    json = {}
    json[@type] = super()
    json
  created_at: ->
    date = @get('created_at')
    date.toDate()