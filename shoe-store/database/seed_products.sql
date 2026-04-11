-- Add all products from the frontend app to the database
-- Uses INSERT IGNORE to avoid duplicates on re-run

-- Featured products (home page)
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(1, 'Air Max Revolution', 'Nike', 179.00, 199.00, 'Running', 4.8, 124, TRUE, 'https://sneakernews.com/wp-content/uploads/2014/02/air-yeezy-2-red-october-508214-660-01.jpeg'),
(2, 'Urban Walker Pro', 'Nike Air Jordan', 139.00, NULL, 'Casual', 4.6, 89, FALSE, 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop&crop=center'),
(3, 'Elite Performance', 'Puma', 199.00, 249.00, 'Training', 4.9, 156, TRUE, 'https://staticc.sportskeeda.com/editor/2023/03/5120d-16777600528430-1920.jpg?w=840'),
(4, 'Classic Canvas', 'Adidas', 89.00, NULL, 'Lifestyle', 4.4, 67, FALSE, 'https://rarest.org/wp-content/uploads/2022/06/Adidas-x-Pharrell-x-Chanel-Human-Race-Trail-NMD.jpg')
(5,'Speed Trainer X', 'Nike', 159.00, 189.00, 'Running', 'women', 4.7, 203, TRUE,'https://sneakernews.com/wp-content/uploads/2014/02/air-yeezy-2-red-october-508214-660-01.jpeg'),
(6,'Street Style 90', 'Reebok', 119.00, NULL, 'Casual', 'unisex', 4.3, 45, FALSE,'https://sneakernews.com/wp-content/uploads/2014/02/air-yeezy-2-red-october-508214-660-01.jpeg');

-- Men's collection
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(101, 'Air Max Professional', 'Nike', 199.00, 249.00, 'Running', 4.8, 156, TRUE, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center'),
(102, 'Classic Leather Boot', 'Timberland', 249.00, NULL, 'Casual', 4.7, 203, FALSE, 'https://i.stpost.com/timberland-6-premium-boots-waterproof-insulated-for-men-in-dark-beige-nubuck~p~ds593_02~1500.2.jpg'),
(103, 'Sport Runner Elite', 'Adidas', 179.00, 199.00, 'Training', 4.6, 134, TRUE, 'https://tse3.mm.bing.net/th/id/OIP.CIj6meIJ15QFWLLEnVRxiwHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'),
(104, 'Business Oxford', 'Cole Haan', 299.00, NULL, 'Formal', 4.9, 89, FALSE, NULL),
(105, 'Street Style Sneaker', 'Puma', 149.00, 179.00, 'Lifestyle', 4.5, 167, FALSE, 'https://3.bp.blogspot.com/-_dGgTPvNK7g/UAfEpWd8SII/AAAAAAAAAHM/NzGMM2pVcNo/s1600/pumashoes01.jpg'),
(106, 'Trail Running Pro', 'Merrell', 189.00, NULL, 'Outdoor', 4.8, 142, TRUE, 'https://s7d4.scene7.com/is/image/WolverineWorldWide/MRLW-J035494-062220-F20-000?wid=900&hei=900');

-- Women's collection 
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(201, 'Rose Gold Runner', 'Nike', 189.00, 219.00, 'Women', 4.9, 234, TRUE, 'https://tse4.mm.bing.net/th/id/OIP.ttKD4tuxUvhO4YJE2h5NuAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'),
(202, 'Elegant Heel', 'Jimmy Choo', 599.00, NULL, 'Women', 4.8, 167, FALSE, 'https://th.bing.com/th/id/OIP.n5ZZpVdvcLztfDvPRkk1oAHaHa?w=216&h=216&c=7&r=0&o=5&dpr=1.3&pid=1.7');

-- All Products page
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(501, 'Air Zoom Pegasus', 'Nike', 219.00, 249.00, 'Running', 4.8, 342, TRUE, 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400&h=400&fit=crop&crop=center'),
(502, 'UltraBoost DNA', 'Adidas', 199.00, NULL, 'Running', 4.7, 287, FALSE, 'https://tse4.mm.bing.net/th/id/OIP.HxzmsJV9qwcXi14wU09bmwHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'),
(601, 'Stan Smith Classic', 'Adidas', 129.00, 149.00, 'Casual', 4.6, 456, FALSE, 'https://tse3.mm.bing.net/th/id/OIP.kDtzx3OYqhnZbhH4mYG3zQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'),
(602, 'Chuck Taylor All Star', 'Converse', 89.00, NULL, 'Casual', 4.4, 623, FALSE, 'https://tse3.mm.bing.net/th/id/OIP.3r-9GawtSputBLpTSstxwQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'),
(701, 'Metcon 8', 'Nike', 199.00, 229.00, 'Training', 4.7, 298, TRUE, 'https://tse1.mm.bing.net/th/id/OIP.b4AjHbUCTnjjDiUuSDfWKQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'),
(702, 'Nano X2', 'Reebok', 179.00, NULL, 'Training', 4.6, 234, FALSE, NULL),
(801, 'Blazer Mid 77', 'Nike', 149.00, 169.00, 'Lifestyle', 4.5, 387, TRUE, 'https://tse2.mm.bing.net/th/id/OIP._n28TLg1WnVCAPT4jSxgZAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'),
(802, 'Forum Low', 'Adidas', 139.00, NULL, 'Lifestyle', 4.4, 234, FALSE, 'https://tse3.mm.bing.net/th/id/OIP.lg1-4flYY5b77SlpRAjWvQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3');

-- Nike brand products
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(1001, 'Air Max Revolution NB', 'Nike', 179.00, 199.00, 'Running', 4.8, 124, TRUE, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center'),
(1002, 'Air Zoom Pegasus NB', 'Nike', 219.00, 249.00, 'Running', 4.8, 342, TRUE, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center'),
(1003, 'Air Max Professional NB', 'Nike', 199.00, 249.00, 'Training', 4.8, 156, TRUE, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/efbef650-d3bf-4808-8988-f1212d3dcce4/air-max-90-shoes-kkLZj6.png'),
(1004, 'Metcon 8 NB', 'Nike', 199.00, 229.00, 'Training', 4.7, 298, TRUE, 'https://www.febbuy.com/uploads/Nike_SB_Shoes/NIke_Dunk_SB_Hi/Nike_SFB_Jungle_Dunk_High_Men_Shoes_Lifestyle_Fashion_White_Blue_Black.jpg'),
(1005, 'Blazer Mid 77 NB', 'Nike', 149.00, 169.00, 'Lifestyle', 4.5, 387, TRUE, 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center'),
(1006, 'Rose Gold Runner NB', 'Nike', 189.00, 219.00, 'Women', 4.9, 234, TRUE, 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&crop=center'),
(1007, 'Air Force 1 Low', 'Nike', 119.00, NULL, 'Lifestyle', 4.7, 892, FALSE, NULL),
(1008, 'React Element 55', 'Nike', 169.00, 199.00, 'Running', 4.6, 445, FALSE, 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/8a9efd65-db93-482c-94f0-ad34a3b21265/air-max-270-mens-shoes-KkLcGR.png'),
(1009, 'Dunk Low Premium', 'Nike', 139.00, NULL, 'Lifestyle', 4.8, 567, TRUE, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center');

-- Adidas brand products
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(2001, 'UltraBoost DNA AD', 'Adidas', 199.00, NULL, 'Running', 4.7, 287, FALSE, 'https://footwearnews.com/wp-content/uploads/2023/02/Ultraboost_Light_Running_Shoes_Black_HQ6339_01_standard-e1677164866275.jpg'),
(2002, 'Stan Smith Classic AD', 'Adidas', 129.00, 149.00, 'Casual', 4.6, 456, FALSE, 'https://assets.adidas.com/images/w_600,f_auto,q_auto/3e0a851dc25f4404981abd72fe8d02ee_9366/Solarcontrol_2.0_Shoes_Black_HP9648_01_standard.jpg'),
(2003, 'Forum Low AD', 'Adidas', 139.00, NULL, 'Lifestyle', 4.4, 234, FALSE, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3ddf058eeae74c769a571c9500b0f19a_9366/Ultraboost_5_Shoes_White_JH9070_HM1.jpg'),
(2004, 'DropSet Trainer', 'Adidas', 189.00, 219.00, 'Training', 4.8, 167, TRUE, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/90c6a6fa827a4da18102d9ede0382778_9366/Adizero_Boston_12_Shoes_Black_ID4234_HM1.jpg'),
(2007, 'Superstar Shell Toe', 'Adidas', 99.00, NULL, 'Lifestyle', 4.8, 1234, FALSE, NULL),
(2008, 'NMD R1 V2', 'Adidas', 179.00, 199.00, 'Lifestyle', 4.5, 678, TRUE, NULL),
(2009, 'Solar Glide 5', 'Adidas', 149.00, NULL, 'Running', 4.6, 345, FALSE, NULL);

-- Puma brand products
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(3001, 'Velocity Nitro', 'Puma', 159.00, NULL, 'Running', 4.5, 167, FALSE, 'https://images-static.nykaa.com/media/catalog/product/d/a/da48daa19325616_n5_.jpg'),
(3002, 'Suede Classic', 'Puma', 119.00, 139.00, 'Casual', 4.3, 198, FALSE, 'https://img.tatacliq.com/images/i12/658Wx734H/MP000000018611159_658Wx734H_202308071422044.jpeg'),
(3003, 'Cross Trainer Elite', 'Puma', 159.00, 179.00, 'Training', 4.4, 143, FALSE, 'https://images-static.nykaa.com/media/catalog/product/tr:h-800,w-800,cm-pad_resize/a/b/abb4d85puma-38059802_1.jpg'),
(3007, 'RS-X Puzzle', 'Puma', 129.00, 149.00, 'Lifestyle', 4.4, 289, TRUE, NULL),
(3008, 'Clyde All-Pro', 'Puma', 189.00, NULL, 'Training', 4.7, 156, FALSE, NULL),
(3009, 'AMG casual shoes', 'Puma', 189.00, NULL, 'Training', 4.7, 156, FALSE, NULL);

-- Converse brand products
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(4001, 'Chuck Taylor All Star', 'Converse', 89.00, NULL, 'Casual', 4.4, 623, FALSE, NULL),
(4002, 'Classic Canvas CV', 'Converse', 49.00, 89.00, 'Lifestyle', 4.4, 289, FALSE, 'https://wallpapercave.com/wp/wp2924223.jpg'),
(4007, 'Chuck 70 High Top', 'Converse', 109.00, NULL, 'Lifestyle', 4.6, 445, FALSE, 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop&crop=center'),
(4008, 'Run Star Hike', 'Converse', 129.00, 149.00, 'Lifestyle', 4.3, 267, TRUE, NULL);

-- Reebok brand products
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(5001, 'Nano X2 RB', 'Reebok', 179.00, NULL, 'Training', 4.6, 234, FALSE, 'https://5.imimg.com/data5/KV/VO/MY-17913176/reebok-one-distance-2-0-running-shoes-500x500.jpg'),
(5002, 'Classic Leather RB', 'Reebok', 119.00, 139.00, 'Lifestyle', 4.6, 198, FALSE, 'https://tse3.mm.bing.net/th/id/OIP.ipvtKnkF-fZ9z-LRKck0VAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3');

-- New Balance brand products
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(6001, 'Fresh Foam X', 'New Balance', 169.00, NULL, 'Running', 4.6, 156, FALSE, 'https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/n/b/nbm990gr2_1.jpg'),
(6002, 'Training Flex1', 'New Balance', 149.00, NULL, 'Training', 4.6, 198, TRUE, NULL),
(6003, 'Training Flex2D', 'New Balance', 149.00, NULL, 'Training', 4.6, 198, TRUE, NULL),
(6004, 'Training Flex3X', 'New Balance', 149.00, NULL, 'Training', 4.6, 198, TRUE, NULL),
(6005, 'Training Flex4Y', 'New Balance', 149.00, NULL, 'Training', 4.6, 198, TRUE, NULL),
(6006, 'Training Flex6X', 'New Balance', 149.00, NULL, 'Training', 4.6, 198, TRUE, NULL);

-- Vans brand products
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(7001, 'Old Skool', 'Vans', 99.00, NULL, 'Casual', 4.7, 342, FALSE, NULL),
(7002, 'Old Skool V2', 'Vans', 99.00, NULL, 'Casual', 4.7, 342, FALSE, 'https://i.pinimg.com/originals/6c/c2/95/6cc29585681bc41da68be8add240aba3.jpg'),
(7003, 'Old Skool V3', 'Vans', 99.00, NULL, 'Casual', 4.7, 342, FALSE, NULL),
(7004, 'Old Skool V4', 'Vans', 99.00, NULL, 'Casual', 4.7, 342, FALSE, NULL),
(7005, 'Old Skool V5', 'Vans', 99.00, NULL, 'Casual', 4.7, 342, FALSE, NULL),
(7006, 'Old Skool V6', 'Vans', 99.00, NULL, 'Casual', 4.7, 342, FALSE, NULL);

-- Under Armour brand products
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(8001, 'HIIT Trainer', 'Under Armour', 169.00, NULL, 'Training', 4.5, 189, FALSE, 'https://i5.walmartimages.com/asr/69bec7fa-1707-4fcf-9820-c7df8a03012b_1.978b106a3b5ab65ffb6e88d092c98e94.jpeg'),
(8002, 'HIIT Trainer V2', 'Under Armour', 169.00, NULL, 'Training', 4.5, 189, FALSE, NULL),
(8003, 'HIIT Trainer V3', 'Under Armour', 169.00, NULL, 'Training', 4.5, 189, FALSE, NULL),
(8004, 'HIIT Trainer V4', 'Under Armour', 169.00, NULL, 'Training', 4.5, 189, FALSE, NULL),
(8005, 'HIIT Trainer V5', 'Under Armour', 169.00, NULL, 'Training', 4.5, 189, FALSE, NULL),
(8006, 'HIIT Trainer V6', 'Under Armour', 169.00, NULL, 'Training', 4.5, 189, FALSE, NULL);

-- ASICS brand products
INSERT IGNORE INTO products (id, name, brand, price, original_price, category, rating, review_count, is_new, image_url) VALUES
(9001, 'Gel-Nimbus 24', 'ASICS', 189.00, 219.00, 'Running', 4.9, 198, TRUE, 'https://tse1.mm.bing.net/th/id/OIP.P0UI3-uV_qkCsOKgyhMAiAHaE8?pid=ImgDet&w=184&h=122&c=7&dpr=1.3&o=7&rm=3'),
(9002, 'Gel-Nimbus 24 V2', 'ASICS', 189.00, 219.00, 'Running', 4.9, 198, TRUE, NULL),
(9003, 'Gel-Nimbus 24 V3', 'ASICS', 189.00, 219.00, 'Running', 4.9, 198, TRUE, NULL);

-- Orders & Invoices tables
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_number VARCHAR(20) NOT NULL UNIQUE,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'card',
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  order_status ENUM('placed', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'placed',
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_brand VARCHAR(100),
  product_image VARCHAR(500),
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  size VARCHAR(10) DEFAULT 'default',
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
