const db = require("../config/db");
const util = require("util");
const dbQueryAsync = util.promisify(db.query).bind(db);

// Indian locale formatting
const formatIndianCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

// Format large numbers with Indian system
const formatIndianNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// ============== SELLER DASHBOARD ==============

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const { seller_id } = req.params;

    const productCountQuery = "SELECT COUNT(*) as count FROM products WHERE seller_id = ?";
    const orderCountQuery = "SELECT COUNT(*) as count FROM orders WHERE seller_id = ?";
    const revenueQuery = "SELECT SUM(total_amount) as total FROM orders WHERE seller_id = ? AND status = 'delivered'";
    const pendingOrdersQuery = "SELECT COUNT(*) as count FROM orders WHERE seller_id = ? AND status = 'processing'";
    const avgRatingQuery = "SELECT AVG(rating) as average FROM products WHERE seller_id = ?";

    const [productCount] = await dbQueryAsync(productCountQuery, [seller_id]);
    const [orderCount] = await dbQueryAsync(orderCountQuery, [seller_id]);
    const [revenue] = await dbQueryAsync(revenueQuery, [seller_id]);
    const [pendingOrders] = await dbQueryAsync(pendingOrdersQuery, [seller_id]);
    const [avgRating] = await dbQueryAsync(avgRatingQuery, [seller_id]);

    const totalRevenue = revenue.total || 0;
    const monthlyGrowth = 12.5; // Sample growth percentage

    res.status(200).json({
      status: true,
      message: "Dashboard statistics retrieved successfully",
      data: {
        totalProducts: productCount.count,
        totalOrders: orderCount.count,
        totalRevenue: totalRevenue,
        totalRevenueFormatted: formatIndianCurrency(totalRevenue),
        pendingOrders: pendingOrders.count,
        monthlyGrowth: monthlyGrowth,
        avgRating: avgRating.average ? parseFloat(avgRating.average).toFixed(1) : 0,
        currency: '₹',
        location: 'Kolkata, West Bengal',
      },
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({ status: false, message: "Error retrieving dashboard statistics" });
  }
};

// ============== SELLER PRODUCTS ==============

// Get all products for a seller
exports.getSellerProducts = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const { search, status, sort } = req.query;

    let query = "SELECT * FROM products WHERE seller_id = ?";
    let params = [seller_id];

    if (search) {
      query += " AND (product_name LIKE ? OR category_id LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    if (sort) {
      const sortMap = {
        name: "product_name ASC",
        price_asc: "price ASC",
        price_desc: "price DESC",
        sales: "sales DESC",
        quantity: "quantity DESC",
      };
      query += ` ORDER BY ${sortMap[sort] || "createdAt DESC"}`;
    } else {
      query += " ORDER BY createdAt DESC";
    }

    const products = await dbQueryAsync(query, params);
    res.status(200).json({
      status: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error("Get seller products error:", error);
    res.status(500).json({ status: false, message: "Error retrieving products" });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const {
      seller_id,
      product_name,
      category_id,
      description,
      cost_price,
      gst_rate,
      hsn_code,
      sku,
      quantity,
      unit,
      image_urls,
      certifications,
      manufacturing_date,
      expiry_date,
    } = req.body;

    if (!product_name || !cost_price || !gst_rate || !seller_id) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
      });
    }

    // Calculate selling price with GST
    const selling_price = parseFloat(cost_price) * (1 + parseFloat(gst_rate) / 100);

    const query = `
      INSERT INTO products (
        seller_id,
        product_name,
        category_id,
        description,
        cost_price,
        price,
        gst_rate,
        hsn_code,
        sku,
        quantity,
        unit,
        image_urls,
        certifications,
        manufacturing_date,
        expiry_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      seller_id,
      product_name,
      category_id || null,
      description || null,
      cost_price,
      selling_price,
      gst_rate,
      hsn_code || null,
      sku || null,
      quantity || 0,
      unit || null,
      JSON.stringify(image_urls || []),
      JSON.stringify(certifications || []),
      manufacturing_date || null,
      expiry_date || null,
    ];

    const result = await dbQueryAsync(query, params);

    res.status(201).json({
      status: true,
      message: "Product added successfully",
      data: {
        id: result.insertId,
        product_name,
        price: selling_price,
        gst_rate,
      },
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ status: false, message: "Error adding product" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { cost_price, gst_rate, quantity, status, ...otherFields } = req.body;

    let updateFields = [];
    let params = [];

    // Add regular fields
    Object.entries(otherFields).forEach(([key, value]) => {
      updateFields.push(`${key} = ?`);
      params.push(value);
    });

    // Handle numeric fields
    if (cost_price !== undefined) {
      updateFields.push("cost_price = ?");
      params.push(cost_price);
    }
    if (gst_rate !== undefined) {
      updateFields.push("gst_rate = ?");
      updateFields.push("price = ?");
      params.push(gst_rate);
      params.push(cost_price * (1 + gst_rate / 100));
    }
    if (quantity !== undefined) {
      updateFields.push("quantity = ?");
      params.push(quantity);
    }
    if (status !== undefined) {
      updateFields.push("status = ?");
      params.push(status);
    }

    updateFields.push("updatedAt = CURRENT_TIMESTAMP");

    params.push(product_id);

    const query = `UPDATE products SET ${updateFields.join(", ")} WHERE id = ?`;
    await dbQueryAsync(query, params);

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ status: false, message: "Error updating product" });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const query = "DELETE FROM products WHERE id = ?";
    await dbQueryAsync(query, [product_id]);

    res.status(200).json({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ status: false, message: "Error deleting product" });
  }
};

// ============== SELLER ORDERS ==============

// Get all orders for a seller
exports.getSellerOrders = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const { status, search } = req.query;

    let query = `
      SELECT o.*, p.product_name, b.name as buyer_name, b.contact_number
      FROM orders o
      JOIN products p ON o.product_id = p.id
      JOIN buyers b ON o.buyer_id = b.id
      WHERE o.seller_id = ?
    `;

    let params = [seller_id];

    if (status) {
      query += " AND o.status = ?";
      params.push(status);
    }

    if (search) {
      query += " AND (o.order_number LIKE ? OR b.name LIKE ? OR p.product_name LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += " ORDER BY o.createdAt DESC";

    const orders = await dbQueryAsync(query, params);

    res.status(200).json({
      status: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Get seller orders error:", error);
    res.status(500).json({ status: false, message: "Error retrieving orders" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    const validStatuses = ["processing", "in_transit", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Invalid status",
      });
    }

    let updateData = { status };

    if (status === "in_transit") {
      updateData.shipped_date = new Date();
    } else if (status === "delivered") {
      updateData.delivery_date = new Date();
    }

    const query = "UPDATE orders SET ? WHERE id = ?";
    await dbQueryAsync(query, [updateData, order_id]);

    res.status(200).json({
      status: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ status: false, message: "Error updating order status" });
  }
};

// Get order statistics
exports.getOrderStats = async (req, res) => {
  try {
    const { seller_id } = req.params;

    const totalQuery = "SELECT COUNT(*) as total FROM orders WHERE seller_id = ?";
    const processingQuery =
      "SELECT COUNT(*) as count FROM orders WHERE seller_id = ? AND status = 'processing'";
    const inTransitQuery =
      "SELECT COUNT(*) as count FROM orders WHERE seller_id = ? AND status = 'in_transit'";
    const deliveredQuery =
      "SELECT COUNT(*) as count FROM orders WHERE seller_id = ? AND status = 'delivered'";
    const revenueQuery =
      "SELECT SUM(total_amount) as total FROM orders WHERE seller_id = ? AND status = 'delivered'";

    const [total] = await dbQueryAsync(totalQuery, [seller_id]);
    const [processing] = await dbQueryAsync(processingQuery, [seller_id]);
    const [inTransit] = await dbQueryAsync(inTransitQuery, [seller_id]);
    const [delivered] = await dbQueryAsync(deliveredQuery, [seller_id]);
    const [revenue] = await dbQueryAsync(revenueQuery, [seller_id]);

    res.status(200).json({
      status: true,
      message: "Order statistics retrieved successfully",
      data: {
        totalOrders: total.total,
        processing: processing.count,
        inTransit: inTransit.count,
        delivered: delivered.count,
        totalRevenue: revenue.total || 0,
      },
    });
  } catch (error) {
    console.error("Get order stats error:", error);
    res.status(500).json({ status: false, message: "Error retrieving order statistics" });
  }
};

// ============== SELLER BRANCHES ==============

// Get all branches for a seller
exports.getSellerBranches = async (req, res) => {
  try {
    const { seller_id } = req.params;

    const query = "SELECT * FROM branches WHERE seller_id = ? ORDER BY branch_type ASC, createdAt ASC";
    const branches = await dbQueryAsync(query, [seller_id]);

    res.status(200).json({
      status: true,
      message: "Branches retrieved successfully",
      data: branches,
    });
  } catch (error) {
    console.error("Get seller branches error:", error);
    res.status(500).json({ status: false, message: "Error retrieving branches" });
  }
};

// Add new branch
exports.addBranch = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const {
      branch_name,
      branch_type,
      street_address,
      city,
      state,
      pincode,
      phone,
      email,
      manager_name,
      latitude,
      longitude,
    } = req.body;

    if (!branch_name || !branch_type || !street_address || !city || !state || !pincode) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
      });
    }

    const query = `
      INSERT INTO branches (
        seller_id,
        branch_name,
        branch_type,
        street_address,
        city,
        state,
        pincode,
        phone,
        email,
        manager_name,
        latitude,
        longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      seller_id,
      branch_name,
      branch_type,
      street_address,
      city,
      state,
      pincode,
      phone || null,
      email || null,
      manager_name || null,
      latitude || null,
      longitude || null,
    ];

    const result = await dbQueryAsync(query, params);

    res.status(201).json({
      status: true,
      message: "Branch added successfully",
      data: {
        id: result.insertId,
        branch_name,
        city,
        state,
      },
    });
  } catch (error) {
    console.error("Add branch error:", error);
    res.status(500).json({ status: false, message: "Error adding branch" });
  }
};

// Update branch
exports.updateBranch = async (req, res) => {
  try {
    const { branch_id } = req.params;
    const updateData = req.body;

    updateData.updatedAt = new Date();

    const query = "UPDATE branches SET ? WHERE id = ?";
    await dbQueryAsync(query, [updateData, branch_id]);

    res.status(200).json({
      status: true,
      message: "Branch updated successfully",
    });
  } catch (error) {
    console.error("Update branch error:", error);
    res.status(500).json({ status: false, message: "Error updating branch" });
  }
};

// Delete branch
exports.deleteBranch = async (req, res) => {
  try {
    const { branch_id } = req.params;

    const query = "DELETE FROM branches WHERE id = ?";
    await dbQueryAsync(query, [branch_id]);

    res.status(200).json({
      status: true,
      message: "Branch deleted successfully",
    });
  } catch (error) {
    console.error("Delete branch error:", error);
    res.status(500).json({ status: false, message: "Error deleting branch" });
  }
};

// ============== SELLER PAYOUTS ==============

// Get payout history
exports.getPayouts = async (req, res) => {
  try {
    const { seller_id } = req.params;

    const query =
      "SELECT * FROM payouts WHERE seller_id = ? ORDER BY createdAt DESC";
    const payouts = await dbQueryAsync(query, [seller_id]);

    res.status(200).json({
      status: true,
      message: "Payouts retrieved successfully",
      data: payouts,
    });
  } catch (error) {
    console.error("Get payouts error:", error);
    res.status(500).json({ status: false, message: "Error retrieving payouts" });
  }
};

// Request payout
exports.requestPayout = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid amount",
      });
    }

    const commissionRate = 10;
    const commissionAmount = (amount * commissionRate) / 100;
    const netAmount = amount - commissionAmount;
    const payoutNumber = `PAY-${Date.now()}`;

    const query = `
      INSERT INTO payouts (
        payout_number,
        seller_id,
        amount,
        commission_rate,
        commission_amount,
        net_amount,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `;

    const params = [
      payoutNumber,
      seller_id,
      amount,
      commissionRate,
      commissionAmount,
      netAmount,
    ];

    const result = await dbQueryAsync(query, params);

    res.status(201).json({
      status: true,
      message: "Payout request submitted successfully",
      data: {
        id: result.insertId,
        payout_number: payoutNumber,
        net_amount: netAmount,
      },
    });
  } catch (error) {
    console.error("Request payout error:", error);
    res.status(500).json({ status: false, message: "Error requesting payout" });
  }
};

// Get payout analytics
exports.getPayoutAnalytics = async (req, res) => {
  try {
    const { seller_id } = req.params;

    const totalRevenueQuery = "SELECT SUM(total_amount) as total FROM orders WHERE seller_id = ? AND status = 'delivered'";
    const pendingPayoutQuery = "SELECT SUM(amount) as total FROM payouts WHERE seller_id = ? AND status = 'pending'";
    const totalPayoutsQuery = "SELECT SUM(net_amount) as total FROM payouts WHERE seller_id = ? AND status = 'completed'";
    const averageOrderValueQuery = "SELECT AVG(total_amount) as average FROM orders WHERE seller_id = ?";

    const [totalRevenue] = await dbQueryAsync(totalRevenueQuery, [seller_id]);
    const [pendingPayout] = await dbQueryAsync(pendingPayoutQuery, [seller_id]);
    const [totalPayouts] = await dbQueryAsync(totalPayoutsQuery, [seller_id]);
    const [avgOrderValue] = await dbQueryAsync(averageOrderValueQuery, [seller_id]);

    const commissionRate = 10;
    const totalRevenue_val = totalRevenue.total || 0;
    const totalCommission = (totalRevenue_val * commissionRate) / 100;
    const pendingPayout_val = pendingPayout.total || 0;
    const totalPayouts_val = totalPayouts.total || 0;
    const avgOrderValue_val = avgOrderValue.average || 0;

    res.status(200).json({
      status: true,
      message: "Analytics retrieved successfully",
      data: {
        totalRevenue: totalRevenue_val,
        totalRevenueFormatted: formatIndianCurrency(totalRevenue_val),
        pendingPayout: pendingPayout_val,
        pendingPayoutFormatted: formatIndianCurrency(pendingPayout_val),
        commissionRate: `${commissionRate}%`,
        commissionAmount: totalCommission,
        commissionAmountFormatted: formatIndianCurrency(totalCommission),
        averageOrderValue: avgOrderValue_val,
        averageOrderValueFormatted: formatIndianCurrency(avgOrderValue_val),
        totalCommission,
        totalPayouts: totalPayouts_val,
        totalPayoutsFormatted: formatIndianCurrency(totalPayouts_val),
        currency: '₹',
        location: 'Kolkata, West Bengal',
      },
    });
  } catch (error) {
    console.error("Get payout analytics error:", error);
    res.status(500).json({ status: false, message: "Error retrieving analytics" });
  }
};

// ============== PAYMENT METHODS ==============

// Get payment methods
exports.getPaymentMethods = async (req, res) => {
  try {
    const { seller_id } = req.params;

    const query = "SELECT * FROM payment_methods WHERE seller_id = ? ORDER BY is_default DESC";
    const methods = await dbQueryAsync(query, [seller_id]);

    res.status(200).json({
      status: true,
      message: "Payment methods retrieved successfully",
      data: methods,
    });
  } catch (error) {
    console.error("Get payment methods error:", error);
    res.status(500).json({ status: false, message: "Error retrieving payment methods" });
  }
};

// Add payment method
exports.addPaymentMethod = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const {
      bank_name,
      account_type,
      account_holder,
      account_number,
      ifsc_code,
      is_default,
    } = req.body;

    if (!bank_name || !account_type || !account_holder || !account_number || !ifsc_code) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
      });
    }

    // If setting as default, unset other defaults
    if (is_default) {
      await dbQueryAsync("UPDATE payment_methods SET is_default = FALSE WHERE seller_id = ?", [
        seller_id,
      ]);
    }

    const query = `
      INSERT INTO payment_methods (
        seller_id,
        bank_name,
        account_type,
        account_holder,
        account_number,
        ifsc_code,
        is_default
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      seller_id,
      bank_name,
      account_type,
      account_holder,
      account_number,
      ifsc_code,
      is_default || false,
    ];

    const result = await dbQueryAsync(query, params);

    res.status(201).json({
      status: true,
      message: "Payment method added successfully",
      data: {
        id: result.insertId,
        bank_name,
        account_number: `****${account_number.slice(-4)}`,
      },
    });
  } catch (error) {
    console.error("Add payment method error:", error);
    res.status(500).json({ status: false, message: "Error adding payment method" });
  }
};

// Delete payment method
exports.deletePaymentMethod = async (req, res) => {
  try {
    const { method_id } = req.params;

    const query = "DELETE FROM payment_methods WHERE id = ?";
    await dbQueryAsync(query, [method_id]);

    res.status(200).json({
      status: true,
      message: "Payment method deleted successfully",
    });
  } catch (error) {
    console.error("Delete payment method error:", error);
    res.status(500).json({ status: false, message: "Error deleting payment method" });
  }
};

// Get tax information
exports.getTaxInfo = async (req, res) => {
  try {
    const { seller_id } = req.params;

    const query = "SELECT * FROM seller_tax_info WHERE seller_id = ?";
    const taxInfo = await dbQueryAsync(query, [seller_id]);

    if (taxInfo.length === 0) {
      return res.status(200).json({
        status: true,
        message: "Tax information not found",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Tax information retrieved successfully",
      data: taxInfo[0],
    });
  } catch (error) {
    console.error("Get tax info error:", error);
    res.status(500).json({ status: false, message: "Error retrieving tax information" });
  }
};

// Update tax information
exports.updateTaxInfo = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const { pan_number, gst_number, tax_year, filing_status } = req.body;

    const checkQuery = "SELECT * FROM seller_tax_info WHERE seller_id = ?";
    const existing = await dbQueryAsync(checkQuery, [seller_id]);

    if (existing.length > 0) {
      const updateQuery =
        "UPDATE seller_tax_info SET pan_number = ?, gst_number = ?, tax_year = ?, filing_status = ? WHERE seller_id = ?";
      await dbQueryAsync(updateQuery, [
        pan_number,
        gst_number,
        tax_year,
        filing_status,
        seller_id,
      ]);
    } else {
      const insertQuery =
        "INSERT INTO seller_tax_info (seller_id, pan_number, gst_number, tax_year, filing_status) VALUES (?, ?, ?, ?, ?)";
      await dbQueryAsync(insertQuery, [
        seller_id,
        pan_number,
        gst_number,
        tax_year,
        filing_status,
      ]);
    }

    res.status(200).json({
      status: true,
      message: "Tax information updated successfully",
    });
  } catch (error) {
    console.error("Update tax info error:", error);
    res.status(500).json({ status: false, message: "Error updating tax information" });
  }
};
