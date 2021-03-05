let isThereFile = async(req,res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 ) {
        return res.status(422).json({
            errors: [
                { message: 'Pòr favor debes selcciona una imagen' }
            ]
        });
    }
    next();
};

let validateExtensionFile = async (req,res, next) => {
    let extensionsAllowed = ['image/png','image/jpg','image/jpeg']
    let extension = extensionsAllowed.find( element => { return req.files.image.mimetype === element });
    if (typeof extension === 'undefined') {
        return res.status(422).json({
            errors: [
                { message: 'La extención de la imagen debe ser png, jpg o jpeg' }
            ]
        })
    }
    next();
};

module.exports = {
    isThereFile,
    validateExtensionFile
}