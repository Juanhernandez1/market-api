const s3 = require("../../../config/aws/s3");

class ImageServices {
  constructor() {}
  async uploadImage(params) {
    try {
      s3.putObject(params, function (err, data) {
        if (err) {
          return false;
        }
        return true;
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = ImageServices;
