class PollChoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  }

  render() {
    return (
      <ul className="list-group">
        {this.props.collection.map((poll_choice)=> {
          return <PollChoiceItem key={poll_choice.cid} poll_choice={poll_choice} />
        })}
      </ul>
      )
  }
}

class PollChoiceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
    this.handleClick = this.handleClick.bind(this);
    _.extend(this, Boaredsauce.Mixins.BackboneMixin)
  }

  modelOrCollection() {
    return this.props.poll_choice
  }

  handleClick(e) {
    this.props.onClick && this.props.onClick(e);
    this.props.poll_choice.answer();
  }

  render() {
    let poll_choice = this.props.poll_choice;
    let className = {
      'selected': poll_choice.get('answered')
    }
    className = 'list-group-item btn ' + _(className).classes();
    let respondents = poll_choice.get('respondents')
    let responses_count = respondents.length
    return (
      <li onClick={this.handleClick}
          className={className}>{poll_choice.get('text')}
          <Badge count={responses_count}/>
      </li>
      )
  }
}

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