class Poll < ApplicationRecord
  belongs_to :user
  has_many :poll_choices

  TYPES = [
    :multiple_choice, # actually, a radio button
    :checkbox,
    :rating
  ]
end
