class Form extends React.Component {
  render() {
    return (
      <form action={this.props.action} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
      )
  }
}

class FormGroup extends React.Component {
  render() {
    return (
      <div className="form-group">
        {this.props.children}
      </div>
    )
  }
}

class ContentEditable extends React.Component {
  render() {
    let props = _.extend({}, this.props)
    props.className = ['form-control', props.className].join(' ')
    return (
      <div {...props} contentEditable='true' data-placeholder="Yello"></div>
    )
  }
}

class SubmitButton extends React.Component {
  render() {
    return (<button type="submit" className="btn btn-default">{this.props.name}</button>)
  }
}

class Panel extends React.Component {
  render() {
    let className = ['panel panel-default', this.props.className].join(' ')
    return (
      <div className={className}>
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
      )
  }
}

class BSRow extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
      )
  }
}