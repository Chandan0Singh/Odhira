const { error } = require("console");
const razorpay = require("../config/razorpay");
// const razorpay =  require("../utils/razorpay")
const crypto = require("crypto");
const { options } = require("../routes/auth");

const createRazorpayOrder = async (req, res)=>{
  try{
     console.log(req.body); 
    const {amount} = req.body;

    const option = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(option);

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error){

    console.log("error : ", error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }

}

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createRazorpayOrder, verifyPayment };
