import moment from "moment";

export const formatDateTime = (dateTime, dateTimeFormat) => {
  return moment(dateTime).format(dateTimeFormat);
};
