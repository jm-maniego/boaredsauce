class PollsController < ApplicationController
  def index
    @polls = Poll.all.includes(:user)
  end
end
