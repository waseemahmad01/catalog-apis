import Joi from 'joi';
import { User } from '../../..';

const role = {
    async role(req, res, next) {
        const roleSchema = Joi.object({
            role: Joi.string().required()
        });

        const { error } = roleSchema.validate(req.body);

        if (error) {
            return next(error);
        }
        const { role } = req.body;
        console.log(req.params.id);
        try {
            const data = await User.findByIdAndUpdate({ _id: req.user._id }, {
                role: role
            }, { new: true });
            return res.status(200).json({ status: 200, message: "fetch successfully", data });
        } catch (error) {
            return next(error);
        }
    }
}

export default role;