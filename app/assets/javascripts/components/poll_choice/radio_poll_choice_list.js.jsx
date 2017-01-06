class RadioPollChoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_id: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({selected_id: e.target.value})
  }

  render() {
    return (
      <ul className="list-group">
        <Form>
          {this.props.collection.map((poll_choice)=> {
            return <RadioPollChoiceItem selected_id={this.state.selected_id}
                                        key={poll_choice.cid}
                                        poll_choice={poll_choice}
                                        question_type='radio'
                                        onChange={this.handleChange} />
          })}
        </Form>
      </ul>
      )
  }
}

// same as CheckboxPollChoiceItem lots of code repetition, but oh welp
class RadioPollChoiceItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // this.props.poll_choice.answer(e.target.checked);
    this.props.onChange(e);
  }

  render() {
    let poll_choice = this.props.poll_choice;
    let className = 'list-group-item btn ';
    let responses_count = poll_choice.get('respondents_count')
    let id = `poll-choice-${poll_choice.cid}`;
    let selected = this.props.selected_id
                   ? this.props.selected_id == poll_choice.get('id')
                   : poll_choice.get('answered');

    return (
      <label className={className}>
        <Badge count={responses_count}/>
        <input
          id={id}
          checked={selected}
          type={this.props.question_type}
          name="poll_choice"
          value={poll_choice.get('id')}
          onChange={this.handleChange}/>
        {poll_choice.get('text')}
      </label>
      )
  }
}