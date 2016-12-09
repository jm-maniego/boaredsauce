class Response < ApplicationRecord
  belongs_to :poll_choice, inverse_of: :responses
  belongs_to :respondent, class_name: "User", foreign_key: :respondent_id, inverse_of: :responses
  validates :poll_choice_id, uniqueness: {scope: :respondent_id}
end
