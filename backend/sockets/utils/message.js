var dayjs = require("dayjs");

var generateMessage = (from, room, text) => {
  return {
    from,
    room,
    text,
    createdDate: dayjs().valueOf(),
  };
};

var generateLocationMessage = (from, room, lat, lon) => {
  return {
    from,
    room,
    url: `https://www.google.com/maps?q=${lat},${lon}`,
    createdDate: dayjs().valueOf(),
  };
};

module.exports = { generateMessage, generateLocationMessage };
