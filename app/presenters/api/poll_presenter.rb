module Api
  class PollPresenter < ResourcePresenter
    attributes :id, :text, :created_at
    belongs_to :user
  end
end