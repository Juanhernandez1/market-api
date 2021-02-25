const addCardValidationRules = require('../../validators/cards/validateStoreCard');
const updateCardValidationRules = require('../../validators/cards/validateUpdateCard');
const validate = require('../../validators/validate');
const isUser = require('../../middleware/isUser');
const verifyAuth = require('../../middleware/authVerify');
const CardServices = require('../../../../services/servicesUsingMongoose/card/CardServices');

function cards(router) {
    const cardServices = new CardServices();

    router.get('/cards', [verifyAuth,isUser,validate] ,async function(req, res) {
        const user_id = req.user._id;
        const {success, status, data } = await cardServices.list(user_id);
        if (success) {
            return res.status(status)
                .json({
                    success,
                    data: data
                })
        }
        return res.status(status)
            .json({
                success,
                message: data
            });
    });

    router.post('/cards/store',addCardValidationRules(),[verifyAuth,isUser,validate], async function(req, res) {
        const {body: card } = req;
        const user_id = req.user._id;
        const {status, success, data } = await cardServices.store(card, user_id);
        if (success) {
            return res.status(status)
                .json({
                    success,
                    message: data
                })
        }
        return res.status(status)
            .json({
                success,
                message: data
            });
    });

    router.put('/cards/update/:card_id',updateCardValidationRules(), [verifyAuth,isUser,validate], async function(req, res) {
        const { body: card }= req;
        const card_id = req.params.card_id;
        const user_id = req.user._id;
        const {status, success, data } = await cardServices.update(card, card_id,user_id);
        if (success) {
            return res.status(status)
                .json({
                    success,
                    message: data
                });
        }
        return res.status(status)
            .json({
                success,
                message: data
            });

    });

    router.delete('/cards/destroy/:card_id',[verifyAuth,isUser], async function(req, res) {
        const card_id = req.params.card_id;
        const user_id = req.user._id;
        const {status, success, data } = await cardServices.destroy(card_id,user_id);
        if (success) {
            return res.status(status)
                .json({
                    success,
                    message: data
                });
        }
        return res.status(status)
            .json({
                success,
                message: data
            });
    });
}
module.exports = cards;