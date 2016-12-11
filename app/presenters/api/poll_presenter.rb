module Api
  class PollPresenter < ResourcePresenter
    attributes :id, :text, :created_at, :question_type
    includes :user, :poll_choices
  end
end