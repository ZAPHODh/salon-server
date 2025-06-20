

import { ZodSchema } from "zod";
import { asyncHandler } from "../../helper";
import { isValidBody } from "../../../lib/is-valid-body";


function validateBodyMiddleware<T>(schema:ZodSchema<T>){
    return asyncHandler( async(req, res, next) => {
        const isValid = await isValidBody({ body:req.body, zodSchema:schema })
        console.log("isValid", isValid)
        if(isValid !== true){
            res.status(400).json({
                message:"Invalid body",
                errors:isValid.format()._errors
            })
            return
        }
        next()
    })
}


export { validateBodyMiddleware }