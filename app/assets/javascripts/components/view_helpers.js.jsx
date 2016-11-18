class Form extends React.Component {
  render() {
    return (
      <form {...this.props} action={this.props.action} onSubmit={this.props.onSubmit}>
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
      <div {...props}
        contentEditable
        onInput={(e) => this.handleChange(e)}
        onBlur={(e) => this.handleChange(e)}
        dangerouslySetInnerHTML={{__html: this.props['data-html']}}></div>
    )
  }

  handleChange(e) {
    let html = e.target.innerHTML
    if (html !== this.lastHTML) {
      this.props.onChange && this.props.onChange(e)
    }
    this.lastHTML = html;
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
      <div {...this.props} className={className}>
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