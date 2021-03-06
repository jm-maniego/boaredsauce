class Form extends React.Component {
  render() {
    return (
      <form
        {...this.props}
        action={this.props.action}
        onSubmit={this.props.onSubmit}>
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
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
  }
  render() {
    let props = _.extend({}, this.props)
    props.className = ['form-control', props.className].join(' ')
    return (
      <div {...props}
        ref={(el) => this.el = el}
        contentEditable
        onInput={(e) => this.handleChange(e)}
        onBlur={(e) => this.handleBlur(e)}
        dangerouslySetInnerHTML={{__html: this.props['data-html']}}></div>
    )
  }

  shouldComponentUpdate(nextProps) {
    return (
      !this.el || ( nextProps['data-html'] !== this.el.innerHTML && nextProps['data-html'] !== this.props['data-html'] )
    );
  }

  componentDidUpdate() {
    if ( this.el && this.props['data-html'] !== this.el.innerHTML ) {
      this.el.innerHTML = this.props['data-html'];
    }
  }

  handleBlur(e) {
    this.handleChange(e);
    this.props.onBlur && this.props.onBlur(e);
  }

  handleChange(e) {
    if (!this.el) return;
    var html = this.el.innerHTML;
    if (html !== this.lastHTML) {
      e.target.value = html
      this.props.onChange && this.props.onChange(e)
    }
    this.lastHTML = html;
  }
}

class SubmitButton extends React.Component {
  render() {
    return (<button type="submit" className="btn btn-primary">{this.props.name}</button>)
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
      <div {...this.props} className="panel-body">
        {this.props.children}
      </div>
      )
  }
}

class PanelActions extends React.Component {
  render() {
    let className = ['panel-actions', this.props.className].join(' ')
    return (
      <div className={className}>
        {this.props.children}
      </div>
      )
  }
}

class BSRow extends React.Component {
  render() {
    return (
      <div id={this.props.id} className="row">
        {this.props.children}
      </div>
      )
  }
}

class CharacterLimitCounter extends React.Component {
  render() {
    let limit = this.props.limit;
    let characters_count = limit - this.props.text.length;
    let classes = this.props.className;
    if (this.props.text.length > limit) {
      classes += " danger";
    }
    return (
      <span className={classes}>{characters_count}</span>
      )
  }
}

CharacterLimitCounter.defaultProps = {
  limit: 145,
  text: ""
}

class TimeAgo extends React.Component {
  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.forceUpdate();
  }

  render() {
    return (
      <span className="timeago-wrapper">
        <time
          className="timeago"
          dateTime={this.props.time.toISOString()}>
          {$.timeago(this.props.time)}
        </time>
      </span>
      )
  }
}

class DropdownButton extends React.Component {
  render() {
    let name = this.props.name && `${this.props.name} `
    let className = ['btn-group', this.props.className].join(' ')
    let dropdownClass = ['dropdown-menu', this.props.dropdownMenuClass].join(' ')
    return (
      <span className={className}>
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
          {name}
          <span className="caret"></span>
        </button>
        <ul className={dropdownClass}>
          {this.props.children}
        </ul>
      </span>
      )
  }
}

class ButtonCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    this.setState({checked: !this.state.checked});
  }

  render() {
    let stateClasses = {
      'glyphicon-unchecked': !this.state.checked,
      'glyphicon-check': this.state.checked,
    }
    let className = "glyphicon " + _(stateClasses).classes();
    return (
      <a onClick={this.toggle} href='#' className="btn btn-default btn-checkbox">
        <span className={className}></span> {this.props.title}
        <input type="hidden" name={this.props.name} value={this.state.checked}/>
      </a>
      )
  }
}

class Badge extends React.Component {
  render() {
    return (
      <span className="badge">{this.props.count}</span>
      )
  }
}