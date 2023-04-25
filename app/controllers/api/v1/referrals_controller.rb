class Api::V1::ReferralsController < ApplicationController
  def show
    referrals = Referral.where(from_id: params[:id])
    render status: :ok, json: { referrals: referrals }
  end

  def create
    referral = Referral.create!(referral_params)
    referrer = User.find(referral_params[:from_id])
    ReferralMailer.with(referral: referral, referrer: referrer).new_referral_email.deliver_later
    render status: :ok, json: {}
  end

  def update
    referral = Referral.find_by(referral_params)
    referral.update!(status: :completed) if referral

    render status: :ok, json: {}
  end

  private

    def referral_params
      params.require(:referral).permit(:from_id, :to)
    end
end
