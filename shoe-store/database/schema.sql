-- StepUp Shoe Store Database Schema
-- MySQL password: xzvb

CREATE DATABASE IF NOT EXISTS stepup_shoes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE stepup_shoes;

-- Users table (supports both local and Google OAuth)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NULL,
  phone VARCHAR(20) NULL,
  google_id VARCHAR(255) NULL,
  avatar VARCHAR(500) NULL,
  provider ENUM('local', 'google') DEFAULT 'local',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_google_id (google_id)
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NULL,
  description TEXT NULL,
  category ENUM('Running','Casual','Training','Lifestyle','Kids') NOT NULL,
  gender ENUM('men','women','kids','unisex') DEFAULT 'unisex',
  image_url VARCHAR(500) NULL,
  hover_image_url VARCHAR(500) NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,
  stock INT DEFAULT 100,
  is_new BOOLEAN DEFAULT FALSE,
  is_on_sale BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product sizes/variants
CREATE TABLE IF NOT EXISTS product_sizes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  stock INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product colors
CREATE TABLE IF NOT EXISTS product_colors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  color_name VARCHAR(50) NOT NULL,
  color_hex VARCHAR(7) NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Wishlist
CREATE TABLE IF NOT EXISTS wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_wishlist (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Cart
CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  size VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_review (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO products (name, brand, price, original_price, category, gender, rating, review_count, is_new) VALUES
('Air Max Revolution', 'Nike', 179.00, 199.00, 'Running', 'men', 4.8, 124, TRUE),
('Urban Walker Pro', 'Nike Air Jordan', 139.00, NULL, 'Casual', 'men', 4.6, 89, FALSE),
('Elite Performance', 'Puma', 199.00, 249.00, 'Training', 'unisex', 4.9, 156, TRUE),
('Classic Canvas', 'Adidas', 89.00, NULL, 'Lifestyle', 'unisex', 4.4, 67, FALSE),
('Speed Trainer X', 'Nike', 159.00, 189.00, 'Running', 'women', 4.7, 203, TRUE),
('Street Style 90', 'Reebok', 119.00, NULL, 'Casual', 'unisex', 4.3, 45, FALSE);
