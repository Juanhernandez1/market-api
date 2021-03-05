const s3 = require('../../../config/aws/s3');

class ImageServices {
    constructor() {
    }
    async uploadImage(params) {
        try {
            const resp = s3.putObject(params)
            return true;
        }catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = ImageServices;