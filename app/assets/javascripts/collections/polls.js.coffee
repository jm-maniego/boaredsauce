class Boaredsauce.Collections.Polls extends Backbone.Collection
  url: "api/polls"
  model: Boaredsauce.Models.Poll
  comparator: (a, b) ->
    b.get('created-at') - a.get('created-at')
