class Api::PollsController < Api::ResourceController
  before_action :set_poll, only: [:answer, :remove_answer]
  def index
    respond_with Poll.all.includes(:user, poll_choices: :respondents), context: current_user
  end

  def create
    @poll = current_user.polls.includes(poll_choices: :respondents).new(poll_params)
    @poll.save
    respond_with @poll
  end

  def destroy
    @poll = current_user.polls.find(params[:id])
    @poll.destroy()
    respond_with @poll
  end

  def answer
    poll_choice = PollChoice.find(params[:poll_choice_id])
    @poll.answer(current_user, poll_choice)
    respond_with @poll, location: nil, context: current_user
  end

  def remove_answer
    poll_choice = PollChoice.find(params[:poll_choice_id])
    @poll.remove_answer(current_user, poll_choice)
    render json: @poll, location: nil, context: current_user
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