let verifyAdmin = (req,res, next) => {
    let user = req.user;
    if (user.role !== 'provider') {
        return res.status(403).json({
            success: false,
            message: "You don't have access to this resource."
        })
    }
    next();
}

module.exports = {
    verifyAdmin
}
