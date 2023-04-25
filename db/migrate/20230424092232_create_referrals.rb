class CreateReferrals < ActiveRecord::Migration[7.0]
  def change
    create_table :referrals do |t|
      t.references :from, null: false, foreign_key: { to_table: :users }
      t.string :to
      t.string :status

      t.timestamps
    end

    add_index :referrals, [:from_id, :to], unique: true
  end
end
