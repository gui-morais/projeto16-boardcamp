import joi from "joi";

export const newCategorieSchema = joi.object({
    name: joi.string().required()
});