Boaredsauce.Mixins.BackboneMixin = {
  componentDidMount: function() {
    this.modelOrCollection().on('add remove change', _.debounce(()=> this.forceUpdate(), 5));
  },
  componentWillUnmount: function () {
    this.modelOrCollection().off(null, null, this);
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
