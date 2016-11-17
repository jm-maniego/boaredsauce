class Boaredsauce.Collections.Polls extends Backbone.Collection
  url: "api/polls"
  model: Boaredsauce.Models.Poll
  comparator: (a, b) ->
    b.created_at() - a.created_at()
