class AddAllowAddAndQuestionTypeToPolls < ActiveRecord::Migration[5.0]
  def change
    add_column :polls, :allow_add, :boolean, null: false, default: false
    add_column :polls, :question_type, :string
  end
end
