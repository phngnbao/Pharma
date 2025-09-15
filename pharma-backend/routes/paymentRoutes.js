const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Payment routes (at root API level for backward compatibility)
// router.post("/create-payment-intent", orderController.createPaymentIntent);
// router.post("/confirm-payment", orderController.confirmPayment);

// VNPay
router.post("/vnpay/create", orderController.createVNPayPayment);
router.get("/vnpay/callback", orderController.handleVNPayCallback);

// MoMo 
router.post("/momo/create", orderController.createMoMoPayment);
router.get("/momo/callback", orderController.handleMoMoCallback);

module.exports = router;
