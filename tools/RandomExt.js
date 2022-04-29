module.exports = {
  random_range: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  randomid: function () {
    return (Date.now().toString(36) + Math.random().toString(36)).replace('.', '');
  },
};
