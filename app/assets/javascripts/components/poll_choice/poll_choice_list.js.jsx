class PollChoiceList extends React.Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.collection.map((poll_choice)=> {
          return <li key={poll_choice.cid} className="list-group-item">{poll_choice.get('text')}</li>
        })}
      </ul>
      )
  }
}

class PollChoicesForm extends React.Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.collection.map((poll_choice)=> {
          return (
            <li key={poll_choice.cid} className="list-group-item">
              <input
                type="text"
                name="poll[poll_choices][][text]"
                placeholder="add an option"
                className="form-control" />
            </li>
            )
        })}
      </ul>
      )
  }
}