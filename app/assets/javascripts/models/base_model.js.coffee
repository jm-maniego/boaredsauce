class Boaredsauce.Models.BaseModel extends Backbone.Model
  toJSON: ->
    json = {}
    json[@type] = super()
    json
  created_at: ->
    date = @get('created_at')
    date.toDate()