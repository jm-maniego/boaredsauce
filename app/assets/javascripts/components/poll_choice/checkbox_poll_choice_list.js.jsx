class CheckboxPollChoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    return (
      <ul className="list-group">
        <Form>
          {this.props.collection.map((poll_choice)=> {
            return <CheckboxPollChoiceItem key={poll_choice.cid}
                                           poll_choice={poll_choice}
                                           question_type='checkbox'
                                           onChange={this.handleChange} />
          })}
        </Form>
      </ul>
      )
  }
}

// same as RadioPollChoiceItem lots of code repetition, but oh welp
class CheckboxPollChoiceItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // _.extend(this, Boaredsauce.Mixins.BackboneMixin)
  }

  // modelOrCollection() {
  //   return this.props.poll_choice;
  // }

  handleChange(e) {
    this.props.poll_choice.answer(e.target.checked);
    this.props.onChange(e);
  }

  render() {
    let poll_choice = this.props.poll_choice;
    let className = 'list-group-item btn ';
    let responses_count = poll_choice.get('respondents_count')
    let id = `poll-choice-${poll_choice.cid}`

    return (
      <label className={className}>
        <Badge count={responses_count}/>
        <input
          id={id}
          checked={poll_choice.get('answered')}
          type={this.props.question_type}
          name="poll_choice"
          value={poll_choice.get('id')}
          onChange={this.handleChange}/>
        {poll_choice.get('text')}
      </label>
      )
  }
}