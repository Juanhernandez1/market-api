require("dotenv").config();

module.exports = {
  facebookAppId: process.env.FACEBOOK_APP_CLIENT_ID,
  googleAppId: process.env.GOOGLE_APP_CLIENT_ID,
  outlookAppId: process.env.OUTLOOK_APP_CLIENT_ID
};
