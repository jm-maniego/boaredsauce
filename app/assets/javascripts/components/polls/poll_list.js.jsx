class PollScreen extends React.Component {
  render() {
    let polls = this.props.collection
    return (
      <BSRow>
        <div className="col-xs-2">
          <Panel>
            <PanelBody>
              <ul>
                {Array(15).fill().map(function(x, i) {
                  return <li key={i}><a href="#">@channel{i}</a></li>
                })}
              </ul>
            </PanelBody>
          </Panel>
        </div>

        <div id="content-container" className="col-xs-6">
          <PollTable polls={polls}/>
        </div>

        <div className="col-xs-3">
          <Dashboard />
        </div>
      </BSRow>
      )
  }
}

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
      html: "",
      polls: new Boaredsauce.Collections.Polls(),
      poll: new Boaredsauce.Models.Poll()
    }
    this.buildPollChoices();
    _.extend(this, Boaredsauce.Mixins.FormEvents)
  }

  buildPollChoices() {
    this.state.poll.build_poll_choices();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!(this.state.text.length > 0)) { return }

    let $form = $(e.target)
    let form_values = $.deparam($form.serialize())
    let newPoll = new Boaredsauce.Models.Poll(form_values.poll)
    newPoll.set({
      text: this.state.text,
      created_at: new Date(),
      user: Boaredsauce.current_user
    })
    this.state.polls.create(newPoll, {
      silent: true,
      success: ()=> {
        this.buildPollChoices();
        this.setState({text: "", html: ""});
      },
      error: (model, xhr)=> {
        alert('an error occured');
        model.destroy();
      }
    })
  }

  textInputChange(e) {
    let target = e.target
    let value = target.innerText.trim()

    this.setState({text: value, html: target.value})
  }

  render() {
    let poll_choices = this.state.poll.get('poll_choices');
    return (
      <div>
        <Form
          id="poll-form"
          onSubmit={(e) => this.handleSubmit(e)}>
          <input type="hidden" name="poll[text]" value={this.state.text} />
          <Panel>
            <PanelBody>
              <FormGroup>
                <ContentEditable
                  data-html={this.state.html}
                  data-placeholder="ask me anything"
                  data-name="html"
                  onChange={(e) => this.textInputChange(e)} />
              </FormGroup>
            </PanelBody>
            <PollChoicesForm collection={poll_choices}/>
            <PanelActions>
              <SubmitButton name="poll" />
            </PanelActions>
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
        <PanelBody>
          <div>
            <h5><a href={Routes.user_path(user)}>{user.fullname()}</a></h5>
          </div>
          <p>
            {poll.get('text')}
          </p>
        </PanelBody>
        <PollChoiceList collection={poll.get('poll_choices')}/>
      </Panel>
      )
  }
}