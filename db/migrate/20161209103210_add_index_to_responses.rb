class AddIndexToResponses < ActiveRecord::Migration[5.0]
  def change
    add_index :responses, [:poll_choice_id, :respondent_id], unique: true
  end
end
