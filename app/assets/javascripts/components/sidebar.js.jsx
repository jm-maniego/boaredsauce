class SideBar extends React.Component {
  render() {
    let current_user = Boaredsauce.current_user;
    let user_path = Routes.user_path(current_user);

    return (
      <div id="sidebar">
        <Panel>
          <PanelBody>
            <a href={user_path}>{current_user.fullname()}</a>
          </PanelBody>
        </Panel>
      </div>
      )
  }
}