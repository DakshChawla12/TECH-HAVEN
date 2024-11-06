import Joi from 'joi';

const signUpValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        phone: Joi.string().min(10).required()
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message).join(', ')
        });
    }

    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message).join(', ')
        });
    }

    next();
};

export { signUpValidation, loginValidation };