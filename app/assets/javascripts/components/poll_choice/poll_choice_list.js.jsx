class PollChoiceFormItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus(e) {
    this.props.onFocus && this.props.onFocus(e);
  }

  render() {
    let poll_choice = this.props.poll_choice;
    return (
      <li className="list-group-item">
        <input
          type="text"
          name="poll[poll_choices][][text]"
          placeholder="add an option"
          className="form-control"
          autoComplete="off"
          onFocus={this.handleFocus} />
      </li>
      )
  }
}

class PollChoicesForm extends React.Component {
  constructor(props) {
    super(props);
    _.extend(this, Boaredsauce.Mixins.BackboneMixin)
    this.handleLastItemFocus = this.handleLastItemFocus.bind(this);
  }

  modelOrCollection() {
    return this.props.collection
  }

  handleLastItemFocus(e) {
    this.props.onLastItemFocus(e)
  }

  render() {
    var onFocusProp = {onFocus: ""};
    let className = ["list-group", this.props.className].join(' ');
    return (
      <ul className={className}>
        {this.props.collection.map((poll_choice, i)=> {
          if (i == (this.props.collection.length - 1)) {
            onFocusProp['onFocus'] = this.handleLastItemFocus
          }
          return (
            <PollChoiceFormItem
              {...onFocusProp}
              key={poll_choice.cid}
              poll_choice={poll_choice}/>
            )
        })}
      </ul>
      )
  }
}