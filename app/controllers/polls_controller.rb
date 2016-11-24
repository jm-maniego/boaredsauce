class PollsController < ApplicationController
  def index
    @polls = Poll.all.includes(:user, :poll_choices)
  end
end
