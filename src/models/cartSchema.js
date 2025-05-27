import mongoose from "mongoose";

const Cart = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      },
      _id: false,
    },
  ],
});

export default mongoose.model("Carts", Cart);
