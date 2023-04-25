import axios from "axios";

const referralsBaseURL = `/api/v1/referrals`;

const create = (payload) => axios.post(referralsBaseURL, { referral: payload });

const show = (id) => axios.get(`${referralsBaseURL}/${id}`);

const update = (id, payload) =>
  axios.put(`${referralsBaseURL}/${id}`, { referral: payload });

const referralsApi = {
  create,
  show,
  update
};

export default referralsApi;
