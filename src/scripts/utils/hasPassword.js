const bcrypt = require("bcrypt");

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(password, salt);
}

async function isSame(password, dbPassword) {
  return bcrypt.compareSync(password, dbPassword);
}

module.exports = {
  hash,
  isSame
};
