module Api
  class PollPresenter < ResourcePresenter
    attributes :id, :text, :created_at, :user
  end
end