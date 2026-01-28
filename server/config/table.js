exports.table = [
  {
    tableName: "users",
    query: `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        user_type ENUM('buyer', 'seller') NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `,
  },
  {
    tableName: "sellers",
    query: `
      CREATE TABLE IF NOT EXISTS sellers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        contact_number VARCHAR(15) NULL,
        address TEXT NOT NULL DEFAULT 'Sector V, Salt Lake, Kolkata',
        city VARCHAR(100) NOT NULL DEFAULT 'Kolkata',
        state VARCHAR(100) NOT NULL DEFAULT 'West Bengal',
        country VARCHAR(100) NOT NULL DEFAULT 'India',
        postal_code VARCHAR(10) NOT NULL DEFAULT '700091',
        registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `,
  },
  {
    tableName: "buyers",
    query: `
      CREATE TABLE IF NOT EXISTS buyers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        contact_number VARCHAR(15) NULL,
        address TEXT NOT NULL DEFAULT 'Kolkata, West Bengal',
        city VARCHAR(100) NOT NULL DEFAULT 'Kolkata',
        state VARCHAR(100) NOT NULL DEFAULT 'West Bengal',
        country VARCHAR(100) NOT NULL DEFAULT 'India',
        postal_code VARCHAR(10) NOT NULL DEFAULT '700091',
        registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `,
  },
  {
    tableName: "categories",
    query: `
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `,
  },
  {
    tableName: "products",
    query: `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seller_id INT NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        category_id INT NULL,
        description TEXT NULL,
        cost_price DECIMAL(10, 2) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        gst_rate DECIMAL(5, 2) NOT NULL DEFAULT 18,
        hsn_code VARCHAR(20) NULL,
        sku VARCHAR(50) UNIQUE NULL,
        quantity INT NOT NULL DEFAULT 0,
        unit VARCHAR(50) NULL,
        image_urls JSON NULL,
        certifications JSON NULL,
        manufacturing_date DATE NULL,
        expiry_date DATE NULL,
        status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
        views INT NOT NULL DEFAULT 0,
        sales INT NOT NULL DEFAULT 0,
        rating DECIMAL(3, 1) NOT NULL DEFAULT 0,
        quality_verified BOOLEAN NOT NULL DEFAULT FALSE,
        verification_date TIMESTAMP NULL,
        verification_id TEXT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES sellers(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `,
  },
  {
    tableName: "transactions",
    query: `
      CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        buyer_id INT NOT NULL,
        seller_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer_id) REFERENCES buyers(id),
        FOREIGN KEY (seller_id) REFERENCES sellers(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );
    `,
  },
  {
    tableName: "reviews",
    query: `
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        buyer_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        review_title VARCHAR(255) NULL,
        review TEXT NULL,
        review_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (buyer_id) REFERENCES buyers(id)
      );
    `,
  },
  {
    tableName: "shipping_info",
    query: `
      CREATE TABLE IF NOT EXISTS shipping_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        transaction_id INT NOT NULL,
        shipping_address TEXT NOT NULL,
        shipping_cost DECIMAL(10, 2) NOT NULL,
        shipping_date TIMESTAMP NULL,
        delivery_date TIMESTAMP NULL,
        tracking_number VARCHAR(255) NULL,
        FOREIGN KEY (transaction_id) REFERENCES transactions(id)
      );
    `,
  },
  {
    tableName: "support_queries",
    query: `
      CREATE TABLE IF NOT EXISTS support_queries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `,
  },
  {
    tableName: "branches",
    query: `
      CREATE TABLE IF NOT EXISTS branches (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seller_id INT NOT NULL,
        branch_name VARCHAR(255) NOT NULL,
        branch_type ENUM('main', 'warehouse', 'distribution', 'retail') NOT NULL DEFAULT 'warehouse',
        street_address VARCHAR(255) NOT NULL DEFAULT 'Sector V, Salt Lake, Kolkata',
        city VARCHAR(100) NOT NULL DEFAULT 'Kolkata',
        state VARCHAR(100) NOT NULL DEFAULT 'West Bengal',
        pincode VARCHAR(10) NOT NULL DEFAULT '700091',
        country VARCHAR(100) NOT NULL DEFAULT 'India',
        phone VARCHAR(15) NULL,
        email VARCHAR(255) NULL,
        manager_name VARCHAR(255) NULL,
        total_products INT NOT NULL DEFAULT 0,
        total_staff INT NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        latitude DECIMAL(10, 8) NOT NULL DEFAULT 22.5726,
        longitude DECIMAL(11, 8) NOT NULL DEFAULT 88.3639,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES sellers(id)
      );
    `,
  },
  {
    tableName: "orders",
    query: `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        seller_id INT NOT NULL,
        buyer_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        gst_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('processing', 'in_transit', 'delivered', 'cancelled') NOT NULL DEFAULT 'processing',
        tracking_id VARCHAR(50) UNIQUE NULL,
        delivery_city VARCHAR(100) NOT NULL DEFAULT 'Kolkata',
        delivery_state VARCHAR(100) NOT NULL DEFAULT 'West Bengal',
        delivery_pincode VARCHAR(10) NOT NULL DEFAULT '700091',
        payment_method VARCHAR(50) NULL,
        order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        shipped_date TIMESTAMP NULL,
        delivery_date TIMESTAMP NULL,
        expected_delivery_date DATE NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES sellers(id),
        FOREIGN KEY (buyer_id) REFERENCES buyers(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );
    `,
  },
  {
    tableName: "payouts",
    query: `
      CREATE TABLE IF NOT EXISTS payouts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        payout_number VARCHAR(50) UNIQUE NOT NULL,
        seller_id INT NOT NULL,
        amount DECIMAL(12, 2) NOT NULL,
        commission_rate DECIMAL(5, 2) NOT NULL DEFAULT 10,
        commission_amount DECIMAL(10, 2) NOT NULL,
        net_amount DECIMAL(12, 2) NOT NULL,
        status ENUM('pending', 'processing', 'completed', 'failed') NOT NULL DEFAULT 'pending',
        payout_date TIMESTAMP NULL,
        payment_method VARCHAR(50) NULL,
        bank_name VARCHAR(100) NULL,
        account_number VARCHAR(20) NULL,
        ifsc_code VARCHAR(15) NULL,
        tax_details JSON NULL,
        notes TEXT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES sellers(id)
      );
    `,
  },
  {
    tableName: "payment_methods",
    query: `
      CREATE TABLE IF NOT EXISTS payment_methods (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seller_id INT NOT NULL,
        bank_name VARCHAR(100) NOT NULL,
        account_type ENUM('savings', 'current') NOT NULL,
        account_holder VARCHAR(255) NOT NULL,
        account_number VARCHAR(20) NOT NULL,
        ifsc_code VARCHAR(15) NOT NULL,
        is_default BOOLEAN NOT NULL DEFAULT FALSE,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES sellers(id)
      );
    `,
  },
  {
    tableName: "seller_tax_info",
    query: `
      CREATE TABLE IF NOT EXISTS seller_tax_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seller_id INT NOT NULL UNIQUE,
        pan_number VARCHAR(20) NULL,
        gst_number VARCHAR(20) NULL,
        tax_year INT NULL,
        filing_status VARCHAR(50) NULL,
        total_tax_paid DECIMAL(12, 2) NOT NULL DEFAULT 0,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES sellers(id)
      );
    `,
  },
];


