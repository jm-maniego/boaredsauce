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
    _.extend(this, Boaredsauce.Mixins.FormEvents)
    this.state = {
      html: "",
      polls: new Boaredsauce.Collections.Polls(),
      poll: new Boaredsauce.Models.Poll()
    }
    this.buildPollChoices();
    this.addNewPollChoice = this.addNewPollChoice.bind(this);
    this.focusToText = this.focusToText.bind(this);
  }

  buildPollChoices() {
    this.state.poll.build_poll_choices();
  }

  handleSubmit(e) {
    e.preventDefault();
    let value = this.textInput.el.innerText.trim()
    if (!(value.length > 0)) { return }

    let $form = $(e.target)
    let form_values = $.deparam($form.serialize())
    let newPoll = new Boaredsauce.Models.Poll(form_values.poll)
    newPoll.set({
      text: value,
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

  focusToText() {
    this.textInput.el.focus();
  }

  textInputChange(e) {
    let target = e.target;
    let value = target.innerText.trim();

    this.setState({text: value, html: target.value})
  }

  addNewPollChoice(e) {
    let poll_choices = this.state.poll.get('poll_choices')
    if (poll_choices.length < this.state.poll.poll_choices_limit) {
      this.state.poll.get('poll_choices').add({text: ""});
    }
  }

  render() {
    let poll_choices = this.state.poll.get('poll_choices');
    let limit = Boaredsauce.Models.Poll.limit;
    return (
      <div>
        <Form
          id="poll-form"
          onSubmit={(e) => this.handleSubmit(e)}>
          <Panel>
            <PanelBody id="poll-text-wrapper" onClick={this.focusToText}>
              <FormGroup>
                <ContentEditable
                  id="poll-text"
                  ref={(textInput) => this.textInput = textInput}
                  data-html={this.state.html}
                  data-placeholder="ask me anything"
                  data-name="html"
                  onChange={(e) => this.textInputChange(e)} />
                <CharacterLimitCounter className="character-limit-counter" limit={limit} text={this.state.text}/>
              </FormGroup>
            </PanelBody>
            <PollChoicesForm collection={poll_choices} onLastItemFocus={this.addNewPollChoice}/>
            <PanelActions>
              <SubmitButton name="poll" />
              <DropdownButton name="poll options">
                <li><ButtonCheckbox title="multiple choice" name="poll[multiple_choice]" /></li>
                <li><ButtonCheckbox title="allow people to add options" name="poll[allow_add]" /></li>
              </DropdownButton>
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
    return (
      <Panel className="poll-item">
        <PollMediaUser poll={poll}/>
        <PollChoiceList collection={poll.get('poll_choices')}/>
      </Panel>
      )
  }
}

class PollMediaUser extends React.Component {
  constructor(props) {
    super(props);
    this.destroyPoll = this.destroyPoll.bind(this);
  }

  destroyPoll() {
    if (confirm("are you sure you want to delete this poll?")) {
      this.props.poll.destroy();
    }
  }

  render() {
    let poll = this.props.poll
    let user = poll.get('user')
    return (
      <PanelBody>
        <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="avatar media-object" />
            </a>
          </div>
          <div className="media-body">
            <div>
              <h5 className="media-heading">
                <a href={Routes.user_path(user)}>{user.fullname()}</a></h5>
              <TimeAgo time={poll.created_at()}/>
              <DropdownButton className="story-option" dropdownMenuClass="dropdown-menu-right">
                <li><a onClick={this.destroyPoll} href="#">Delete</a></li>
              </DropdownButton>
            </div>
            <p>
              {poll.get('text')}
            </p>
          </div>
        </div>
      </PanelBody>
      )
  }
}