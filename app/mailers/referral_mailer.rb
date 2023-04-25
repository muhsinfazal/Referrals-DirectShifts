class ReferralMailer < ApplicationMailer
  def new_referral_email
    @referral = params[:referral]
    @referrer = params[:referrer]

    mail(to: @referral.to, subject: "You got a new referral!")
  end
end
