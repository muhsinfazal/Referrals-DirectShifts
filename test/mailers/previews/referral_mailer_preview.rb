# Preview all emails at http://localhost:3000/rails/mailers/referral_mailer
class ReferralMailerPreview < ActionMailer::Preview
  def new_referral_email
    # Set up a temporary order for the preview
    referral = Referral.new(from_id: 1, to: "joe@gmail.com", status: "pending", created_at: "2023-04-24 11:07:10.634241")

    ReferralMailer.with(referral: referral).new_referral_email
  end
end
