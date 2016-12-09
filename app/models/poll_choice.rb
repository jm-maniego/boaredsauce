class PollChoice < ApplicationRecord
  belongs_to :poll, inverse_of: :poll_choices
  has_many :responses, dependent: :destroy
  has_many :respondents, through: :responses

  ACCESSIBLE_ATTRIBUTES = [:id, :text]

  validates :text, presence: true
  validates :text, length: { maximum: 140 }
end
