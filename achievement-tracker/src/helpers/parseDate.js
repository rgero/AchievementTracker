export const parseDate = (dateString) => {
  return new Date(dateString + "T12:00:00");
}