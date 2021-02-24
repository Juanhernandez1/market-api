async function getJsonUser(user, simple= false) {

    if (simple) {
        return {
            id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            is_email_verified: user.is_email_verified,
            is_oauth2: user.is_oauth2,
        }
    }
    return {
        id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        address: user.address,
        nit: user.nit,
        phones: user.phones,
        coordinates: user.coordinates,
        role: user.role,
        is_email_verified: user.is_email_verified,
        is_active: user.is_active,
        is_oauth2: user.is_oauth2,
    }
}

module.exports = {
    getJsonUser
}