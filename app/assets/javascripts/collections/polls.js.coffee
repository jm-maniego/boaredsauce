class Boaredsauce.Collections.Polls extends Boaredsauce.Collections.BaseCollection
  url: "api/polls"
  model: Boaredsauce.Models.Poll
  comparator: (a, b) ->
    b.created_at() - a.created_at()
