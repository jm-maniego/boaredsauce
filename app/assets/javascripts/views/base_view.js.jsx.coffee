class Boaredsauce.Views.BaseView extends Backbone.View
  initialize: (options={}) ->
    @options = options

  component: -> null

  render: ->
    ReactDOM.render(@component(), this.el)
    this

