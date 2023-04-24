import axios from "axios";

const apiUrl = "users";

const signIn = ({ email, password }) => {
  return axios.post(`${apiUrl}/sign_in`, {
    user: { email, password }
  });
};

const signUp = ({
  email,
  password,
  password_confirmation,
  first_name,
  last_name
}) => {
  return axios.post(`${apiUrl}`, {
    user: { email, password, password_confirmation, first_name, last_name }
  });
};

const signOut = () => {
  return axios.delete(`${apiUrl}/sign_out`);
};

const changePassword = (password, password_confirmation, current_password) => {
  return axios.put(`${apiUrl}/password`, {
    user: { password, password_confirmation, current_password }
  });
};

const resetPassword = (email) => {
  return axios.post(`${apiUrl}/password`, {
    user: { email }
  });
};

const resetPasswordWithToken = (
  password,
  password_confirmation,
  reset_password_token
) => {
  return axios.put(`${apiUrl}/password`, {
    user: { password, password_confirmation, reset_password_token }
  });
};

const verifyEmail = (confirmation_token) => {
  return axios.get(`${apiUrl}/confirmation`, {
    params: { confirmation_token }
  });
};

const sendEmailVerification = () => {
  return axios.get(`${apiUrl}/confirmation/new`);
};

const deviseApi = {
  signIn,
  signUp,
  signOut,
  changePassword,
  resetPassword,
  resetPasswordWithToken,
  verifyEmail,
  sendEmailVerification
};

export default deviseApi;
