Boaredsauce.Mixins.BackboneMixin = {
  componentDidMount: function() {
    console.log('component did mount!!')
    this.props.backboneView.listenTo(this.modelOrCollection(), 'add remove', _.debounce(()=> this.forceUpdate(), 5))
  }
}

Boaredsauce.Mixins.FormEvents = {
  inputChange: function(e) {
    let $target = $(e.target)
    let name = $target.data('name')
    let value = e.target.value || $target.text()
    return this.setState({ [ name ]: value})
  }
}
