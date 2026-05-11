-- Konversi Database MySQL ke PostgreSQL untuk Vercel
-- Jalankan script ini di database PostgreSQL Anda

-- Buat tabel pelanggan
CREATE TABLE IF NOT EXISTS pelanggan (
  id_pelanggan SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telepon VARCHAR(15)
);

-- Buat tabel produk
CREATE TABLE IF NOT EXISTS produk (
  id_produk SERIAL PRIMARY KEY,
  nama_produk VARCHAR(100) NOT NULL,
  kategori VARCHAR(50),
  harga DECIMAL(10,2) NOT NULL
);

-- Buat tabel pesanan
CREATE TABLE IF NOT EXISTS pesanan (
  id_pesanan SERIAL PRIMARY KEY,
  id_pelanggan INTEGER REFERENCES pelanggan(id_pelanggan) ON DELETE CASCADE,
  tanggal_pesanan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_harga DECIMAL(12,2) DEFAULT 0.00,
  status_pesanan VARCHAR(20) DEFAULT 'Diproses'
);

-- Buat tabel detail_pesanan
CREATE TABLE IF NOT EXISTS detail_pesanan (
  id_detail SERIAL PRIMARY KEY,
  id_pesanan INTEGER REFERENCES pesanan(id_pesanan) ON DELETE CASCADE,
  id_produk INTEGER REFERENCES produk(id_produk) ON DELETE CASCADE,
  jumlah INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

-- Insert data pelanggan
INSERT INTO pelanggan (id_pelanggan, nama, email, telepon) VALUES
(1, 'Budi Santoso', 'budi@email.com', '08120001'),
(2, 'Siti Aminah', 'siti@email.com', '08120002'),
(3, 'Andi Wijaya', 'andi@email.com', '08120003'),
(4, 'Rina Melati', 'rina@email.com', '08120004'),
(5, 'Joko Anwar', 'joko@email.com', '08120005'),
(6, 'Maya Sari', 'maya@email.com', '08120006'),
(7, 'Hendra Gunawan', 'hendra@email.com', '08120007'),
(8, 'Lestari', 'lestari@email.com', '08120008'),
(9, 'Reza Rahadian', 'reza@email.com', '08120009'),
(10, 'Dian Sastro', 'dian@email.com', '08120010'),
(11, 'Fajar Nugraha', 'fajar@email.com', '08120011'),
(12, 'Putri Marino', 'putri@email.com', '08120012');

-- Insert data produk
INSERT INTO produk (id_produk, nama_produk, kategori, harga) VALUES
(1, 'Laptop Asus', 'Elektronik', 7500000.00),
(2, 'Mouse Wireless', 'Aksesoris', 150000.00),
(3, 'Keyboard Mekanik', 'Aksesoris', 450000.00),
(4, 'Monitor 24 Inch', 'Elektronik', 1800000.00),
(5, 'Kabel HDMI', 'Aksesoris', 50000.00),
(6, 'Flashdisk 64GB', 'Penyimpanan', 90000.00),
(7, 'SSD 512GB', 'Penyimpanan', 600000.00),
(8, 'RAM 8GB', 'Komponen', 400000.00),
(9, 'Webcam 1080p', 'Elektronik', 300000.00),
(10, 'Headset Gaming', 'Aksesoris', 250000.00),
(11, 'Printer Inkjet', 'Elektronik', 1200000.00),
(12, 'Tinta Hitam', 'Aksesoris', 80000.00);

-- Insert data pesanan
INSERT INTO pesanan (id_pesanan, id_pelanggan, tanggal_pesanan, total_harga, status_pesanan) VALUES
(1, 1, '2023-10-01 10:00:00', 7650000.00, 'Diproses'),
(2, 2, '2023-10-02 11:30:00', 450000.00, 'Diproses'),
(3, 3, '2023-10-03 09:15:00', 1850000.00, 'Diproses'),
(4, 4, '2023-10-04 14:20:00', 600000.00, 'Diproses'),
(5, 5, '2023-10-05 16:45:00', 700000.00, 'Diproses'),
(6, 6, '2023-10-06 08:10:00', 150000.00, 'Diproses'),
(7, 7, '2023-10-07 13:25:00', 1280000.00, 'Diproses'),
(8, 8, '2023-10-08 15:50:00', 90000.00, 'Diproses'),
(9, 9, '2023-10-09 10:40:00', 7950000.00, 'Diproses'),
(10, 10, '2023-10-10 12:15:00', 400000.00, 'Diproses'),
(11, 11, '2023-10-11 09:30:00', 250000.00, 'Diproses'),
(12, 12, '2023-10-12 17:00:00', 2250000.00, 'Diproses');

-- Insert data detail_pesanan
INSERT INTO detail_pesanan (id_detail, id_pesanan, id_produk, jumlah, subtotal) VALUES
(1, 1, 1, 1, 7500000.00),
(2, 1, 2, 1, 150000.00),
(3, 2, 3, 1, 450000.00),
(4, 3, 4, 1, 1800000.00),
(5, 3, 5, 1, 50000.00),
(6, 4, 7, 1, 600000.00),
(7, 5, 8, 1, 400000.00),
(8, 5, 9, 1, 300000.00),
(9, 6, 2, 1, 150000.00),
(10, 7, 11, 1, 1200000.00),
(11, 7, 12, 1, 80000.00),
(12, 8, 6, 1, 90000.00),
(13, 9, 1, 1, 7500000.00),
(14, 9, 3, 1, 450000.00),
(15, 10, 8, 1, 400000.00),
(16, 11, 10, 1, 250000.00),
(17, 12, 4, 1, 1800000.00),
(18, 12, 3, 1, 450000.00);

-- Reset sequences untuk auto increment
SELECT setval('pelanggan_id_pelanggan_seq', (SELECT MAX(id_pelanggan) FROM pelanggan));
SELECT setval('produk_id_produk_seq', (SELECT MAX(id_produk) FROM produk));
SELECT setval('pesanan_id_pesanan_seq', (SELECT MAX(id_pesanan) FROM pesanan));
SELECT setval('detail_pesanan_id_detail_seq', (SELECT MAX(id_detail) FROM detail_pesanan));