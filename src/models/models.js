import joi from "joi";

export const newCategorySchema = joi.object({
    name: joi.string().required()
});

export const newGameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().greater(0).integer().required(),
    categoryId: joi.number().integer().required(),
    pricePerDay: joi.number().greater(0).required()
});

export const newClientSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).regex(/^\d+$/).required(),
    cpf: joi.string().length(11).regex(/^\d+$/).required(),
    birthday: joi.date().required()
});

export const newRentalSchema = joi.object({
    customerId: joi.number().greater(0).integer().required(),
    gameId: joi.number().greater(0).integer().required(),
    daysRented: joi.number().greater(0).integer().required()
});