class CreatePollChoices < ActiveRecord::Migration[5.0]
  def change
    create_table :poll_choices do |t|
      t.integer :poll_id
      t.text :text

      t.timestamps
    end
  end
end
