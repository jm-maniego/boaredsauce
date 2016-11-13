Boaredsauce.Views.PollList = class extends React.Component {
  render() {
    return (
      <div>
        <ol id="poll-list">
          {this.props.polls.map( (poll) => {
            return <Boaredsauce.Views.PollItem key={poll.get('id')} poll={poll} />
          })}
        </ol>
      </div>
      )
  }
}

Boaredsauce.Views.PollItem = class extends React.Component {
  render() {
    let poll = this.props.poll
    return (
      <li className="poll-item panel panel-default">
        <div className="panel-body">
          {poll.get('text')}
        </div>
      </li>
      )
  }
}