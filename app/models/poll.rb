class Poll < ApplicationRecord
  belongs_to :user
  has_many :poll_choices, inverse_of: :poll, dependent: :destroy

  TYPES = [
    :multiple_choice, # actually, a radio button
    :checkbox,
    :rating
  ]

  accepts_nested_attributes_for :poll_choices
end
