class Api::PollsController < Api::ResourceController
  def index
    respond_with Poll.all.includes(:user, :poll_choices)
  end

  def create
    @poll = current_user.polls.new(poll_params)
    @poll.save
    respond_with @poll, full_messages: true
  end

  def destroy
    @poll = current_user.polls.find(params[:id])
    @poll.destroy()
    respond_with @poll
  end

  private

    def set_poll
      @poll = Poll.find(params[:id])
    end

    def poll_params
      params.require(:poll).permit(
        Poll::ACCESSIBLE_ATTRIBUTES,
        poll_choices_attributes: PollChoice::ACCESSIBLE_ATTRIBUTES)
    end
end