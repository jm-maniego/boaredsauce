class Api::PollsController < Api::ResourceController
  def index
    respond_with Poll.all.includes(:user, :poll_choices)
  end

  def create
    @poll = current_user.polls.new(poll_params)
    if @poll.save
      respond_with @poll
    end
  end

  private

    def set_poll
      @poll = Poll.find(params[:id])
    end

    def poll_params
      params.require(:poll).permit(:text)
    end
end