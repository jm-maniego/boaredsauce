class CheckboxPoll < Poll
  # this is shit 😂😂😂
  # def answer(user, choice_ids)
  #   responses.where(respondent: user).where.not(poll_choice_id: choice_ids).delete_all
  #   # #build won't work with poll_choices.where
  #   choice_ids -= responses.where(respondent: user).pluck(:poll_choice_id)
  #   poll_choices.select{|pc| choice_ids.include?(pc.id)}.each do |poll_choice|
  #     poll_choice.responses.build(respondent: user)
  #   end
  #   save
  # end

  def answer(user, poll_choice)
    poll_choice.responses.build(respondent: user)
    poll_choice.save
  end

  def remove_answer(user, poll_choice)
    response = poll_choice.responses.find_by_respondent_id(user.id)
    response.destroy
  end
end