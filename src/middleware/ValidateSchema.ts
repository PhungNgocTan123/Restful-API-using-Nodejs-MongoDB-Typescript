import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { IAuthor } from "../models/Author";
import Logging from "../library/logging";


export const ValidateJoi = (shcema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await shcema.validateAsync(req.body)
        } catch (error) {
            Logging.error(error);

            res.status(422).json({ error })
        }
    }
}

export const Shcemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    }
}