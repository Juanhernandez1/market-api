const User = require("../../../models/mongoose/user");
const hasPassword = require("../../../scripts/utils/hasPassword");
const Event = require("../../../config/event/Event");
const mailSubscriber = require("../../../subscribers/user/sendCodeToEmailProviders");
const generateCode = require("../../../scripts/codeEmailVerify");
mailSubscriber(Event.instance.emitter);

class ProviderAccountServices {
  constructor() {}

  async signUp({ user }) {
    const hashedPassword = await hasPassword.hash(user.password);
    const { code, calculateDate } = await generateCode(5);

    const _user = new User({
      address: user.address,
      phones: user.phones,
      nit: user.nit,
      coordinates: user.coordinates,
      name: user.name,
      email: user.email,
      password: hashedPassword,
      code_to_verify_email: code,
      send_at: calculateDate.toString(),
      role: "provider"
    });

    try {
      const data = await _user.save({ timestamps: true, validateBeforeSave: true });
      Event.instance.emitter.emit("signup-providers", data);
      return {
        status: 201,
        data,
        success: true
      };
    } catch (err) {
      return {
        status: 500,
        data: err,
        success: false
      };
    }
  }

  async updateProfile(user, user_id) {
    try {
      const _user = await User.findByIdAndUpdate(
        user_id,
        {
          name: user.name,
          email: user.email,
          nit: user.nit,
          address: user.address,
          phones: user.phones,
          coordinates: user.coordinates,
          cost_of_shipping: user.cost_of_shipping,
          delivery_business_days: user.delivery_business_days
        },
        { new: true }
      );

      return {
        status: 200,
        success: true,
        data: _user
      };
    } catch (err) {
      return {
        status: 200,
        success: true,
        data: user
      };
    }
  }
}

module.exports = ProviderAccountServices;
