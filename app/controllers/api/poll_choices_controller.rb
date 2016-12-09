class Api::PollChoicesController < Api::ResourceController
  before_action :set_poll_choice, only: [:answer]

  def answer
    @poll_choice.responses.build(respondent: current_user)
    @poll_choice.save
    respond_with @poll_choice, context: current_user, location: nil
  end

  private

    def set_poll_choice
      @poll_choice = PollChoice.find(params[:id])
    end
end