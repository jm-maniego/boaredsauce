class Boaredsauce.Views.PollsIndex extends Boaredsauce.Views.BaseView
  component: ->
    polls = @collection
    `<PollScreen collection={polls}/>`