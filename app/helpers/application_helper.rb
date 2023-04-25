module ApplicationHelper
  def get_client_props
    { current_user: current_user }
  end
end
