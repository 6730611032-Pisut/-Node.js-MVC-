ติดตั้ง Library (NPM Packages) ที่ต้องใช้
ก่อนจะเริ่มรันโปรเจกต์ ต้องติดตั้งเครื่องมือเหล่านี้ก่อน โดยเปิด Terminal แล้วพิมพ์คำสั่ง:
npm init -y
npm install express ejs mysql2 multer

express: ตัวหลักที่ใช้สร้าง Server
ejs: ใช้สำหรับทำหน้าเว็บ (Template Engine)
mysql2: ใช้เชื่อมต่อฐานข้อมูล MySQL
multer: ใช้สำหรับจัดการการอัปโหลดไฟล์รูปภาพสินค้า

เปิด XAMPP และ Start Apache กับ MySQL
ไปที่ http://localhost/phpmyadmin
สร้างฐานข้อมูลใหม่ชื่อ: supermarket_db
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

สร้างโฟลเดอร์ public
ข้างใน public ให้สร้างโฟลเดอร์ uploads

เเล้วก็พิมพ์คำสั่ง npm run start
จากนั้นเปิด Browser ไปที่: http://localhost:3000
