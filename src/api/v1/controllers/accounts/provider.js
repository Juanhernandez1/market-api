const ProviderAccountServices = require('../../../../services/servicesUsingMongoose/accounts/ProviderAccountServices');

function userAccounts(router) {
    const providerAccountServices = new ProviderAccountServices();

    router.post('/accounts/providers/sing-up', async function (req, res) {

    });
}
module.exports = userAccounts;