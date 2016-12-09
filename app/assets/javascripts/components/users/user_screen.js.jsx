class UserScreen extends React.Component {

  render() {
    let user = this.props.model;
    let polls = user.get('polls');

    return (
      <div>
        <ProfileBanner />
        <BSRow id="timeline-content">
          <div className="col-xs-2">
            <ProfileActions />
          </div>
          <div id="content-container" className="col-xs-7">
            <PollTable polls={polls}/>
          </div>
          <div className="col-xs-3">
            <ProfileCard />
          </div>
        </BSRow>
      </div>
      )
  }
}

class ProfileBanner extends React.Component {
  render() {
    return (
      <div id="profile-banner"></div>
      )
  }
}

class ProfileCard extends React.Component {
  render() {
    return (
      <div id="profile-card">
        <div id="profile-pic-wrapper">
          <div id="profile-pic"></div>
        </div>
      </div>
      )
  }
}

class ProfileActions extends React.Component {
  render() {
    return (
      <div id="profile-actions">
        <button className="btn btn-primary">follow</button>
      </div>
      )
  }
}