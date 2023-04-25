class Referral < ApplicationRecord
  default_scope { order(created_at: :asc) }

  belongs_to :user, :foreign_key => 'from_id'

  validates :from_id, presence: true
  validates :to, presence: true, uniqueness: { scope: :from_id, message: "has already been referred" }
  validate :to_not_equal_from

  enum status: { pending: "pending", completed: "completed" }, _default: :pending

  private

    def to_not_equal_from
      existing_user = User.find(from_id)
      if existing_user&.email == to
        errors.add(:to, "can't be the same as from")
      end
    end
end
