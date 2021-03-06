class PollScreen extends React.Component {
  render() {
    let polls = this.props.collection
    return (
      <BSRow>
        <div className="col-xs-2">
        </div>

        <div id="content-container" className="col-xs-7">
          <PollTable polls={polls}/>
        </div>

        <div className="col-xs-3">
          <SideBar />
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
      text: "",
      polls: new Boaredsauce.Collections.Polls(),
      poll: new Boaredsauce.Models.Poll(),
      focused: false
    }
    this.buildPollChoices();
    this.addNewPollChoice = this.addNewPollChoice.bind(this);
    this.focusToText = this.focusToText.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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
        this.handleBlur();
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

  handleFocus(e) {
    this.setState({focused: true});
  }

  handleBlur() {
    this.setState({focused: false});
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
    let formStateClasses = {
      "hidden": !this.state.focused
    }
    formStateClasses = _(formStateClasses).classes();
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
                  onFocus={this.handleFocus}
                  onChange={(e) => this.textInputChange(e)} />
                <CharacterLimitCounter className="character-limit-counter" limit={limit} text={this.state.text}/>
              </FormGroup>
            </PanelBody>
            <PollChoicesForm className={formStateClasses} collection={poll_choices} onLastItemFocus={this.addNewPollChoice}/>
            <PanelActions className={formStateClasses}>
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
    // _.extend(this, Boaredsauce.Mixins.BackboneMixin)
    this.modelOrCollection().on('add remove', _.debounce(()=> this.forceUpdate(), 5));
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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this, null);
    // _.extend(this, Boaredsauce.Mixins.BackboneMixin)
    // wont work: this.modelOrCollection().on('change', ()=> this.forceUpdate());
    // see issue: http://stackoverflow.com/questions/22406126/change-event-in-backbone-relational-not-working
    // not using backbone relational, but similar
    this.modelOrCollection().on('change', ()=>_.defer(this.forceUpdate)); // hack
  }

  modelOrCollection() {
    return this.props.poll;
  }

  handleChange(e) {
    this.props.poll.answer(e.target.value, e.target.checked);
  }

  render() {
    console.log(this.props.poll.get('id'), 'wat')
    let poll = this.props.poll
    let question_type = poll.get('question_type');
    let QuestionTypeComponent = window[`${question_type}ChoiceList`]

    return (
      <Panel className="poll-item">
        <PollMediaUser poll={poll}/>
        <QuestionTypeComponent
          onChange={this.handleChange}
          collection={poll.get('poll_choices')} />
      </Panel>
      )
  }
}

class PollMediaUser extends React.Component {
  constructor(props) {
    super(props);
    this.destroyPoll = this.destroyPoll.bind(this);
  }

  destroyPoll(e) {
    if (confirm("are you sure you want to delete this poll?")) {
      this.props.poll.destroy();
    }
  }

  render() {
    let poll = this.props.poll
    let user = poll.get('user')
    let user_path = Routes.user_path(user);
    return (
      <PanelBody>
        <div className="media">
          <div className="media-left">
            <a href={user_path}>
              <img className="avatar media-object" />
            </a>
          </div>
          <div className="media-body">
            <div>
              <h5 className="media-heading">
                <a href={user_path}>{user.fullname()}</a></h5>
              <TimeAgo time={poll.created_at()}/>
              <DropdownButton className="story-option" dropdownMenuClass="dropdown-menu-right">
                <li><a onClick={this.destroyPoll} data-href>Delete</a></li>
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