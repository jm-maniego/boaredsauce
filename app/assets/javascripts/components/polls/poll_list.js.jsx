class PollTable extends React.Component {
  render() {
    return (
      <div id="poll-table">
        <PollForm onSubmit={(e)=> this.handleSubmit(e)} />
        <PollList polls={this.props.polls} />
      </div>
      )
  }
}

class PollForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      polls: new Boaredsauce.Collections.Polls()
    }
    _.extend(this, Boaredsauce.Mixins.FormEvents)
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.trim().length == 0) { return }

    this.state.polls.create({
      text: this.state.text,
      created_at: new Date(),
      user: Boaredsauce.current_user
    }, {silent: true})
    this.setState({text: ""})
  }

  render() {
    return (
      <div>
        <Panel id="poll-form-wrapper">
          <Form id="poll-form" onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup>
              <ContentEditable
                data-html={this.state.text}
                data-placeholder="ask me anything"
                data-name="text"
                onChange={(e) => this.inputChange(e)} />
            </FormGroup>
            <SubmitButton name="poll" />
          </Form>
        </Panel>
        <NewListContainer collection={this.state.polls} />
      </div>
      )
  }
}

class NewListContainer extends React.Component {
  render() {
    return (<PollList polls={this.props.collection}/>)
  }
}

class PollList extends React.Component {
  constructor(props) {
    super(props);
    _.extend(this, Boaredsauce.Mixins.BackboneMixin)
  }

  modelOrCollection() {
    return this.props.polls
  }

  render() {
    return (
      <div>
        <ol className="poll-list">
          {this.props.polls.map( (poll) => {
            return <PollItem key={poll.cid} poll={poll} />
          })}
        </ol>
      </div>
      )
  }
}

class PollItem extends React.Component {
  render() {
    let poll = this.props.poll
    let user = poll.get('user')
    return (
      <Panel className="poll-item">
        <div>
          <h5><a href="#">{user.fullname()}</a></h5>
        </div>
        <p>
          {poll.get('text')}
        </p>
      </Panel>
      )
  }
}

class PollIndex extends React.Component {
  render() {
    let polls = this.props.backboneView.collection
    return (
      <div>
        <div id="content-container">
          <PollTable polls={polls}/>
        </div>
        <div id="right-container"></div>
      </div>
      )
  }
}