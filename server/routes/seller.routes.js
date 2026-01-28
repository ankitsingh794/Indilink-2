const router = require("express").Router();
const sellerCtrl = require("../controller/seller.controller");

// ============== DASHBOARD ==============
router.get("/seller/:seller_id/dashboard", sellerCtrl.getDashboardStats);

// ============== PRODUCTS ==============
router.get("/seller/:seller_id/products", sellerCtrl.getSellerProducts);
router.post("/seller/:seller_id/products", sellerCtrl.addProduct);
router.put("/seller/products/:product_id", sellerCtrl.updateProduct);
router.delete("/seller/products/:product_id", sellerCtrl.deleteProduct);

// ============== ORDERS ==============
router.get("/seller/:seller_id/orders", sellerCtrl.getSellerOrders);
router.put("/seller/orders/:order_id/status", sellerCtrl.updateOrderStatus);
router.get("/seller/:seller_id/orders/stats", sellerCtrl.getOrderStats);

// ============== BRANCHES ==============
router.get("/seller/:seller_id/branches", sellerCtrl.getSellerBranches);
router.post("/seller/:seller_id/branches", sellerCtrl.addBranch);
router.put("/seller/branches/:branch_id", sellerCtrl.updateBranch);
router.delete("/seller/branches/:branch_id", sellerCtrl.deleteBranch);

// ============== PAYOUTS ==============
router.get("/seller/:seller_id/payouts", sellerCtrl.getPayouts);
router.post("/seller/:seller_id/payouts/request", sellerCtrl.requestPayout);
router.get("/seller/:seller_id/analytics", sellerCtrl.getPayoutAnalytics);

// ============== PAYMENT METHODS ==============
router.get("/seller/:seller_id/payment-methods", sellerCtrl.getPaymentMethods);
router.post("/seller/:seller_id/payment-methods", sellerCtrl.addPaymentMethod);
router.delete("/seller/payment-methods/:method_id", sellerCtrl.deletePaymentMethod);

// ============== TAX INFO ==============
router.get("/seller/:seller_id/tax-info", sellerCtrl.getTaxInfo);
router.put("/seller/:seller_id/tax-info", sellerCtrl.updateTaxInfo);

module.exports = router;
