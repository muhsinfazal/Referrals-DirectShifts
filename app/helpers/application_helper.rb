module ApplicationHelper
  def get_client_props
    {authorized: current_user.present?}
  end
end
