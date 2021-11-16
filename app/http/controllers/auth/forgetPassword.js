import twilio from 'twilio';
import { User } from '../../..';
import { ACCOUNTSID, AUTHTOKEN, SERVICEID } from '../../../config';
const client = twilio(ACCOUNTSID, AUTHTOKEN);
import bcrypt from 'bcrypt';

const forgetPassword = {
    async verifyEmail(req, res, next) {
        const { email, code } = req.body;
        try {
            const data = await client.verify.services(SERVICEID)
                .verificationChecks
                .create({ to: email, code: code });
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },
    async forget(req, res, next) {
        const { email, password } = req.body;
        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);
        let data;
        try {
            const exist = await User.exists({ email: email });
            if (exist) {
                data = await User.findOneAndUpdate({ email: email }, {
                    password: hashPassword
                })
            }
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    }
}

export default forgetPassword;