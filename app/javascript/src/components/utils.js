const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const getUtcTime = (time) =>
  dayjs.utc(time).format("hh:mm:ss A, DD-MM-YYYY");
