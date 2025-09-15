// Initialize Stripe only if secret key is available
// let stripe;
// if (process.env.STRIPE_SECRET_KEY) {
//     stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// } else {
//     console.warn(
//         "Stripe secret key not found, payment features will be disabled"
//     );
// }
//const crypto = require("crypto");
//const querystring = require("qs");
//const axios = require("axios");

const {
    ordersCollection,
    medicinesCollection,
    ObjectId,
} = require("../mongodb/mongodb");

const orderController = {
    // Get orders by customer email
    getOrdersByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            const query = { "customerInfo.email": email };
            const orders = await ordersCollection
                .find(query)
                .sort({ createdAt: -1 })
                .toArray();
            res.send(orders);
        } catch (error) {
            res.status(500).send({
                message: "Error fetching orders",
                error: error.message,
            });
        }
    },

    // Get all orders (admin only)
    getAllOrders: async (req, res) => {
        try {
            const orders = await ordersCollection
                .find({})
                .sort({ createdAt: -1 })
                .toArray();
            res.send(orders);
        } catch (error) {
            res.status(500).send({
                message: "Error fetching orders",
                error: error.message,
            });
        }
    },

    // Create payment intent
    // createPaymentIntent: async (req, res) => {
    //     try {
    //         if (!stripe) {
    //             return res.status(503).send({
    //                 message:
    //                     "Payment service is not available. Stripe is not configured.",
    //                 error: "Missing STRIPE_SECRET_KEY",
    //             });
    //         }

    //         const {
    //             amount,
    //             currency = "usd",
    //             customerInfo,
    //             cartItems,
    //         } = req.body;

    //         // Validate required fields
    //         if (!amount || amount <= 0) {
    //             return res.status(400).send({
    //                 message: "Valid amount is required",
    //             });
    //         }

    //         // Calculate the amount in cents (Stripe expects amount in smallest currency unit)
    //         const amountInCents = Math.round(amount * 100);

    //         // Create a PaymentIntent with the order amount and currency
    //         const paymentIntent = await stripe.paymentIntents.create({
    //             amount: amountInCents,
    //             currency: currency,
    //             metadata: {
    //                 customerEmail: customerInfo?.email || "",
    //                 customerName: customerInfo?.fullName || "",
    //                 itemCount: cartItems?.length || 0,
    //                 orderType: "medicine_purchase",
    //             },
    //             automatic_payment_methods: {
    //                 enabled: true,
    //             },
    //         });

    //         res.send({
    //             clientSecret: paymentIntent.client_secret,
    //             paymentIntentId: paymentIntent.id,
    //         });
    //     } catch (error) {
    //         console.error("Error creating payment intent:", error);
    //         res.status(500).send({
    //             message: "Error creating payment intent",
    //             error: error.message,
    //         });
    //     }
    // },

    // --- VNPay ---
    createVNPayPayment: async (req, res) => {
        try {
            const { orderId, amount, bankCode } = req.body;

            const vnp_TmnCode = process.env.VNP_TMNCODE;
            const vnp_HashSecret = process.env.VNP_HASHSECRET;
            const vnp_Url = process.env.VNP_URL;
            const vnp_ReturnUrl = process.env.VNP_RETURNURL;

            let vnp_Params = {};
            vnp_Params["vnp_Version"] = "2.1.0";
            vnp_Params["vnp_Command"] = "pay";
            vnp_Params["vnp_TmnCode"] = vnp_TmnCode;
            vnp_Params["vnp_Locale"] = "vn";
            vnp_Params["vnp_CurrCode"] = "VND";
            vnp_Params["vnp_TxnRef"] = orderId;
            vnp_Params["vnp_OrderInfo"] = `Thanh toan don hang ${orderId}`;
            vnp_Params["vnp_OrderType"] = "billpayment";
            vnp_Params["vnp_Amount"] = amount * 100; // VND x100
            vnp_Params["vnp_ReturnUrl"] = vnp_ReturnUrl;
            vnp_Params["vnp_IpAddr"] = req.ip;
            vnp_Params["vnp_CreateDate"] = new Date()
                .toISOString()
                .replace(/[-:TZ.]/g, "")
                .slice(0, 14);

            if (bankCode) {
                vnp_Params["vnp_BankCode"] = bankCode;
            }

            // Sort params
            vnp_Params = sortObject(vnp_Params);

            const signData = querystring.stringify(vnp_Params, { encode: false });
            const hmac = crypto.createHmac("sha512", vnp_HashSecret);
            const signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
            vnp_Params["vnp_SecureHash"] = signed;

            const paymentUrl = vnp_Url + "?" + querystring.stringify(vnp_Params, { encode: false });
            res.json({ paymentUrl });
        } catch (error) {
            console.error("VNPay error:", error);
            res.status(500).json({ message: "Error creating VNPay payment", error: error.message });
        }
    },
    // VNPay return
     handleVNPayCallback: async (req, res) => {
        try {
            const vnp_Params = req.query;
            const secureHash = vnp_Params["vnp_SecureHash"];
            delete vnp_Params["vnp_SecureHash"];
            delete vnp_Params["vnp_SecureHashType"];

            const signData = querystring.stringify(sortObject(vnp_Params), { encode: false });
            const hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);
            const signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

            if (secureHash === signed) {
                // Thanh toán thành công → update đơn hàng
                await ordersCollection.updateOne(
                    { _id: new ObjectId(vnp_Params["vnp_TxnRef"]) },
                    { $set: { paymentStatus: "paid", orderStatus: "confirmed" } }
                );
                res.json({ RspCode: "00", Message: "Success" });
            } else {
                res.json({ RspCode: "97", Message: "Checksum failed" });
            }
        } catch (error) {
            res.status(500).json({ message: "VNPay callback error", error: error.message });
        }
    },

    // Confirm payment and create order
    // confirmPayment: async (req, res) => {
    //     try {
    //         if (!stripe) {
    //             return res.status(503).send({
    //                 message:
    //                     "Payment service is not available. Stripe is not configured.",
    //                 error: "Missing STRIPE_SECRET_KEY",
    //             });
    //         }

    //         const { paymentIntentId, customerInfo, cartItems, orderTotal } =
    //             req.body;

    //         // Verify payment intent with Stripe
    //         const paymentIntent = await stripe.paymentIntents.retrieve(
    //             paymentIntentId
    //         );

    //         if (paymentIntent.status !== "succeeded") {
    //             return res.status(400).send({
    //                 message: "Payment not completed",
    //             });
    //         }

    //         // Create order in database
    //         const order = {
    //             paymentIntentId: paymentIntentId,
    //             customerInfo: customerInfo,
    //             items: cartItems,
    //             orderTotal: orderTotal,
    //             paymentStatus: "paid",
    //             orderStatus: "confirmed",
    //             createdAt: new Date().toISOString(),
    //             updatedAt: new Date().toISOString(),
    //         };

    //         const result = await ordersCollection.insertOne(order);

    //         // Update stock quantities for ordered medicines
    //         for (const item of cartItems) {
    //             const medicineId = new ObjectId(item._id);
    //             const quantityOrdered = item.quantity;

    //             // Decrease stock quantity
    //             await medicinesCollection.updateOne(
    //                 { _id: medicineId },
    //                 {
    //                     $inc: { stockQuantity: -quantityOrdered },
    //                     $set: {
    //                         inStock: true,
    //                         updatedAt: new Date().toISOString(),
    //                     },
    //                 }
    //             );

    //             // Check if stock is now zero and update inStock status
    //             const updatedMedicine = await medicinesCollection.findOne({
    //                 _id: medicineId,
    //             });
    //             if (updatedMedicine && updatedMedicine.stockQuantity <= 0) {
    //                 await medicinesCollection.updateOne(
    //                     { _id: medicineId },
    //                     { $set: { inStock: false, stockQuantity: 0 } }
    //                 );
    //             }
    //         }

    //         res.status(201).send({
    //             message: "Order created successfully",
    //             orderId: result.insertedId,
    //             order: order,
    //         });
    //     } catch (error) {
    //         console.error("Error confirming payment:", error);
    //         res.status(500).send({
    //             message: "Error confirming payment",
    //             error: error.message,
    //         });
    //     }
    // },

      // --- MoMo ---
    createMoMoPayment: async (req, res) => {
        try {
            const { orderId, amount } = req.body;
            const endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

            const partnerCode = process.env.MOMO_PARTNER_CODE;
            const accessKey = process.env.MOMO_ACCESS_KEY;
            const secretKey = process.env.MOMO_SECRET_KEY;
            const redirectUrl = process.env.MOMO_RETURNURL;
            const ipnUrl = process.env.MOMO_NOTIFYURL;

            const requestId = orderId + new Date().getTime();
            const orderInfo = `Thanh toan don hang ${orderId}`;
            const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureWallet`;

            const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

            const requestBody = {
                partnerCode,
                accessKey,
                requestId,
                amount: `${amount}`,
                orderId: orderId,
                orderInfo,
                redirectUrl,
                ipnUrl,
                extraData: "",
                requestType: "captureWallet",
                signature,
                lang: "vi",
            };

            const response = await axios.post(endpoint, requestBody);
            res.json({ payUrl: response.data.payUrl });
        } catch (error) {
            console.error("MoMo error:", error);
            res.status(500).json({ message: "Error creating MoMo payment", error: error.message });
        }
    },

    // MoMo notify
    handleMoMoCallback: async (req, res) => {
        try {
            const data = req.body;
            if (data.resultCode === 0) {
                await ordersCollection.updateOne(
                    { _id: new ObjectId(data.orderId) },
                    { $set: { paymentStatus: "paid", orderStatus: "confirmed" } }
                );
                res.json({ message: "MoMo payment success" });
            } else {
                res.json({ message: "MoMo payment failed", resultCode: data.resultCode });
            }
        } catch (error) {
            res.status(500).json({ message: "MoMo callback error", error: error.message });
        }
    },
};

// Helper
function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;

};

module.exports = orderController;
