class PollChoice < ApplicationRecord
  belongs_to :poll, inverse_of: :poll_choices
end
