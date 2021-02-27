const Card = require('../../../models/mongoose/cards');
const jwt = require('../../../scripts/utils/jwt');
const hasPassword = require('../../../scripts/utils/hasPassword');

class CardServices {
    constructor() {}

    async list(user_id) {
        try {
            const cards = await Card.find({user_id: user_id}
            , '_id owner_name number due_date ccv is_selected_to_pay').sort({is_selected_to_pay:'desc'}).exec();
            return {
                status: 200,
                success: true,
                data: cards
            }
        }catch (err) {
            return {
                status: 500,
                success: true,
                data: err
            }
        }
    }

    async store(card, user_id) {
        let is_selected_to_pay = false;
        const result = await  this.isFirstMethodOfPaymentAdded(user_id);
        if (result) {
            is_selected_to_pay = true;
        }
        try{
            const _card = new Card( {
                user_id: user_id,
                owner_name: card.owner_name,
                number: card.number,
                due_date: card.due_date,
                ccv: card.ccv,
                is_selected_to_pay
            })
            const save = await _card.save({timestamps:true, validateBeforeSave:true})
            return {
                status: 201,
                success: true,
                data: "Metodo de pago guardado !"
            }
        }catch(err) {
            return {
                status: 500,
                success: false,
                data: err
            }
        }
    }

    async update(card, card_id, user_id) {
        try {
            const findCard = await Card.findOne({_id: card_id, user_id: user_id}).exec();
            if (!findCard) {
                return {
                    status: 404,
                    success: false,
                    data: "La tarjeta no existe"
                }
            }
            if (card.is_selected_to_pay) {
                const trigger = await this.triggerFalseStateInCards(findCard);
            }
            const update = await Card.findByIdAndUpdate(findCard._id,
                {
                    owner_name: card.owner_name,
                    number: card.number,
                    due_date: card.due_date,
                    ccv: card.ccv,
                    is_selected_to_pay: card.is_selected_to_pay },
                {new: true});
            return {
                status: 200,
                success: true,
                data: "El metodo de pago ha sido actualizado"
            }

        }catch (err) {
            return {
                status: 500,
                success: false,
                data: err
            }
        }
    }

    async destroy(card_id, user_id) {
        try {
            const findCard = await Card.findOne({_id : card_id, user_id : user_id}).exec();
            if (!findCard) {
                return {
                    status: 404,
                    success: false,
                    data: "La tarjeta no existe"
                }
            }
            const removeCard = await Card.findByIdAndDelete(findCard._id);
            return {
                status: 200,
                success: true,
                data: "El metodo de pago fue removido"
            }
        }catch (err) {
            return {
                status: 500,
                success: false,
                data: err
            }
        }
    }

    async hasAvailablePayment(user_id) {
        try {
            const card = await Card.findOne({user_id: user_id, is_selected_to_pay: true}).exec();
            if (card) {
                return true;
            }
            return false;
        }catch (err) {
            console.log(err)
            return false;
        }
    }

    async isFirstMethodOfPaymentAdded(user_id) {
        try {
            const card = await Card.findOne({user_id: user_id}).exec();
            if (!card) {
                return true;
            }
            return  false;
        }catch (err) {
            console.log(err);
        }
    }

    async triggerFalseStateInCards(card) {
        try {
            const triggerState = await Card.updateMany({user_id: card.user_id }, {is_selected_to_pay: false})
            console.log(triggerState.nModified);
            return true;
        }catch (err) {
            console.log(err)
            return false;
        }
    }


}

module.exports = CardServices;