class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <DashboardProfile />
      </div>
      )
  }
}

class DashboardProfile extends React.Component {
  render() {
    let current_user = Boaredsauce.current_user
    let user_path = Routes.user_path(current_user)
    return (
      <Panel id="dashboard">
        <div id="dashboard-bg"></div>
        <PanelBody>
          <div>
            <a href={user_path} id="dashboard-profile">
              <img src="" className="media-object media-user"/>
            </a>
          </div>
          <a href={user_path}>{current_user.fullname()}</a>
        </PanelBody>
      </Panel>
    )
  }
}