const { googleAppId } = require("./oAuth2");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(googleAppId);

module.exports = {
  client,
  googleAppId
};
