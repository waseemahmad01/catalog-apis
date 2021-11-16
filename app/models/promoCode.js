import mongoose from "mongoose"
import { APP_URL } from "../config";

const promoSchema = mongoose.Schema({
  promocode: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  starting_date: {
    type: String,
    required: true
  },
  ending_date: {
    type: String,
    required: true
  },
}, { timestamps: true });

export default mongoose.model('Promocode', promoSchema, 'promocodes');