class Boaredsauce.Models.BaseModel extends Backbone.Model
  belongs_to: []
  has_many: []

  set: (attributes, options)->
    super
    if typeof attributes == 'string'
      return

    if model_attributes = attributes.attributes
      @attributes = model_attributes
    association_mapping = {
      'Models': @belongs_to,
      'Collections': @has_many
    }
    _.each(association_mapping, ((associations, association_type)->
      associations = Object.keys(attributes).filter((a)-> !!~associations.indexOf(a))
      _.each(associations, ((association_str) ->
        association_class_str = _(association_str).classify()
        association_class = Boaredsauce[association_type][association_class_str]
        @attributes[association_str] = new association_class(attributes[association_str])
      ), this)
    ), this)

  toJSON: (options)->
    options = _.extend({ include_type: true }, options)
    json = super
    include_type = options.include_type
    options.include_type = false

    _.each([@belongs_to, @has_many], ((associations)->
      _.each(associations, ((association_str) ->
        json["#{association_str}_attributes"] = @get(association_str).toJSON(options)
        delete json[association_str]
      ), this)
    ), this)

    if include_type
      new_json = {}
      new_json[@type] = json
      json = new_json
    json
  created_at: ->
    date = @get('created_at')
    date.toDate()