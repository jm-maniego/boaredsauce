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
    textInput = this.textInput.htmlEl
    value = textInput.innerText.trim()
    if (value.length == 0) { return }

    this.state.polls.create({
      text: value,
      created_at: new Date(),
      user: Boaredsauce.current_user
    }, {silent: true})
    this.setState({text: ""})
  }

  render() {
    return (
      <div>
        <Form id="poll-form" onSubmit={(e) => this.handleSubmit(e)}>
          <Panel actions={<SubmitButton name="poll" />}>
            <FormGroup>
              <ContentEditable
                ref={(textInput) => this.textInput = textInput}
                data-html={this.state.text}
                data-placeholder="ask me anything"
                data-name="text"
                onChange={(e) => this.inputChange(e)} />
            </FormGroup>
          </Panel>
        </Form>
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
          <h5><a href={Routes.user_path(user)}>{user.fullname()}</a></h5>
        </div>
        <p>
          {poll.get('text')}
        </p>
      </Panel>
      )
  }
}

class PollScreen extends React.Component {
  render() {
    let polls = this.props.collection
    let current_user = Boaredsauce.current_user
    return (
      <BSRow>
        <div className="col-xs-3">
          <Panel>
            <ul>
              {Array(15).fill().map(function(x, i) {
                return <li key={i}><a href="#">@channel{i}</a></li>
              })}
            </ul>
          </Panel>
        </div>

        <div id="content-container" className="col-xs-6">
          <PollTable polls={polls}/>
        </div>

        <div className="col-xs-3">
          <div>
            <Panel>
              <a href={Routes.user_path(current_user)}>{current_user.fullname()}</a>
            </Panel>
          </div>
        </div>
      </BSRow>
      )
  }
}