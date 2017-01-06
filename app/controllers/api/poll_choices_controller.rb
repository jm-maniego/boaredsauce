class Api::PollChoicesController < Api::ResourceController
  # before_action :set_poll_choice, only: [:answer, :remove_answer]

  # def answer
  #   @poll_choice.answer(current_user)
  #   respond_with @poll_choice, context: current_user, location: nil
  # end

  # def remove_answer
  #   response = @poll_choice.responses.where(respondent_id: current_user.id).first
  #   response.destroy
  #   respond_with @poll_choice, context: current_user, location: nil
  # end

  # private

  #   def set_poll_choice
  #     @poll_choice = PollChoice.find(params[:id])
  #   end
end