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
// http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
// https://github.com/lovasoa/react-contenteditable/blob/master/src/react-contenteditable.js
class ContentEditable extends React.Component {
  render() {
    let props = _.extend({}, this.props)
    props.className = ['form-control', props.className].join(' ')
    return (
      <div {...props}
        ref={(e) => this.htmlEl = e}
        contentEditable
        onInput={(e) => this.handleChange(e)}
        onBlur={(e) => this.handleChange(e)}
        dangerouslySetInnerHTML={{__html: this.props['data-html']}}></div>
    )
  }

  shouldComponentUpdate(nextProps) {
    return (
      !this.htmlEl || ( nextProps['data-html'] !== this.htmlEl.innerHTML && nextProps['data-html'] !== this.props['data-html'] )
    );
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props['data-html'] !== this.htmlEl.innerHTML ) {
      this.htmlEl.innerHTML = this.props['data-html'];
    }
  }
  handleChange(e) {
    if (!this.htmlEl) return;
    var html = this.htmlEl.innerHTML;
    if (html !== this.lastHTML) {
      e.target.value = html
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
    var {actions, ...props} = this.props
    return (
      <div {...props} className={className}>
        {this.props.children}
      </div>
      )
  }
}

class PanelBody extends React.Component {
  render() {
    return(
      <div className="panel-body">
        {this.props.children}
      </div>
      )
  }
}

class PanelActions extends React.Component {
  render() {
    return (
      <div className="panel-actions">
        {this.props.children}
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