class Poll < ApplicationRecord
  belongs_to :user
  has_many :poll_choices, inverse_of: :poll, dependent: :destroy

  TYPES = [
    :multiple_choice, # actually, a radio button
    :checkbox,
    :rating
  ]

  validates :text, presence: true
  validates :text, length: { maximum: 145 }
  validate :poll_choices_minimum
  validate :poll_choices_maximum

  accepts_nested_attributes_for :poll_choices, reject_if: ->(attributes) { attributes['text'].strip.blank? }

  private

    def poll_choices_minimum
      errors.add(:poll_choices, "must be at least 2") if poll_choices.size < 2
    end

    def poll_choices_maximum
      errors.add(:poll_choices, "are too many (maximum of 10)") if poll_choices.size > 10
    end
end
