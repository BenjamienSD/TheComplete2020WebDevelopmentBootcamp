// date module
const today = new Date();

exports.getDate = function () {
  let options = { day: 'numeric', month: 'long', year: 'numeric' };
  return today.toLocaleDateString("en-US", options);
}

exports.getDay = function () {
  let options = { weekday: 'long' };
  return today.toLocaleDateString("en-US", options);
}