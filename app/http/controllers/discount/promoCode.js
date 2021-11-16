import Joi from "joi";
import { CustomErrorHandler, FindStores, Promo, User } from "../../..";

const promoCode = {
  async index(req, res, next) {
    let data;
    try {
      data = await Promo.find()
        .sort({ createdAt: -1 });
      FindStores.endingTime(data);
      res.status(200).json({ status: true, message: "fetch successfully", data });
    } catch (error) {
      return next(error);
    }
  },
  async promo(req, res, next) {

    const promoSchema = Joi.object({
      promocode: Joi.string().required(),
      discount: Joi.string().required(),
      starting_date: Joi.string().required(),
      ending_date: Joi.string().required(),
    });

    const { error } = promoSchema.validate(req.body);
    if (error) {
      return next(CustomErrorHandler.wrongCredentials(error));
    }

    const { promocode, discount, starting_date, ending_date } = req.body;
    try {
      const data = await Promo.create({
        promocode,
        discount,
        ending_date,
        starting_date
      });
      res.status(201).json({ status: 'true', message: 'fetch successfully', data });
    } catch (error) {
      return next(CustomErrorHandler.notFound(error));
    }
  },

  async checkPromo(req, res, next) {
    const { promo } = req.query;
    let data;
    let promoCode;
    try {
      const id = req.user._id;
      data = await Promo.findOne({ promocode: promo });
      if (data !== null) {
        const user = await User.findOne({ _id: id });
        const pro = user.promos.some(prom => prom === promo);
        if (!pro) {
          promoCode = data;
        } else {
          promoCode = "Promo code is not valid"
        }
      } else {
        promoCode = "Promo code is not valid"
      }

      res.status(200).json({
        status: true, message: 'fetch successfully', data: promoCode
      });
    } catch (error) {
      return next(error);
    }
  },
  async applyPromo(req, res, next) {
    const { promo } = req.query;
    let data;
    try {
      const id = req.user._id;
      const exist = await Promo.exists({ promocode: promo });
      if (exist) {
        data = await User.findOneAndUpdate({ _id: id }, {
          $push: {
            promos: promo
          }
        }, { new: true });
      }
      res.status(200).json({ status: true, message: "Promo code apply successfully", data });
    } catch (error) {
      return next(error);
    }
  }
}

export default promoCode;