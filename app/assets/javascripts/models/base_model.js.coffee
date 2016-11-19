class Boaredsauce.Models.BaseModel extends Backbone.Model
  belongs_to: {}

  set: (attributes, options)->
    super
    if model_attributes = attributes.attributes
      @attributes = model_attributes

    _.each(@belongs_to, ((model_str)->
      model_class_str = _(model_str).capitalize()
      model_class = Boaredsauce.Models[model_class_str]
      @attributes[model_str] = new model_class(attributes[model_str])
    ), this)

  toJSON: ->
    json = {}
    json[@type] = super()
    json
  created_at: ->
    date = @get('created_at')
    date.toDate()