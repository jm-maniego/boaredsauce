module Api
  class PollPresenter < ResourcePresenter
    attributes :id, :text, :created_at
    includes :user, :poll_choices
  end
end