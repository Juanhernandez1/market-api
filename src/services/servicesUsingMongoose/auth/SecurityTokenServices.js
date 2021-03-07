const Security = require("../../../models/mongoose/security");

async function saveToken(token, user_id) {
  try {
    const security = new Security({
      user_id: user_id,
      token,
      is_valid: true
    });
    const _token = await security.save({ timestamps: true });
    console.log("Token saved");
  } catch (err) {
    console.log("Token" + err);
  }
}

async function invalidToken(token) {
  try {
    const findToken = await Security.findOneAndUpdate(
      { token: token },
      { is_valid: false },
      { new: true }
    );
    return {
      status: 200,
      success: true,
      message: "Session finalizada"
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      message: err
    };
  }
}

async function tokenIsActive(token) {
  try {
    const findToken = await Security.findOne({ token: token }).exec();
    return {
      success: true,
      isActive: findToken.is_valid
    };
  } catch (err) {
    return {
      success: false,
      isActive: false,
      message: "Toke not exists " + err
    };
  }
}

module.exports = {
  saveToken,
  invalidToken,
  tokenIsActive
};
