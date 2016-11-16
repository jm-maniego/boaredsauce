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
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Panel>
          <Form action="/" onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup>
              <ContentEditable data-name="text" onKeyUp={(e) => this.inputChange(e)} />
            </FormGroup>
            <SubmitButton name="poll" />
          </Form>
        </Panel>
        <NewListContainer />
      </div>
      )
  }
}

class NewListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: new Boaredsauce.Collections.Polls()
    }
  }

  render() {
    return (<PollList polls={this.state.collection}/>)
  }
}

class PollList extends React.Component {
  render() {
    return (
      <div>
        <ol id="poll-list">
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
    console.log('rendering poll item!')
    let poll = this.props.poll
    return (
      <Panel className="poll-item">
        <div>
          <h5><a href="#">Juan Miguel Maniego</a></h5>
        </div>
        <p>
          {poll.get('text')}
        </p>
      </Panel>
      )
  }
}

class PollIndex extends React.Component {
  constructor(props) {
    super(props);
    _.extend(this, Boaredsauce.Mixins.BackboneMixin)
  }

  modelOrCollection() {
    return this.props.backboneView.collection
  }

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