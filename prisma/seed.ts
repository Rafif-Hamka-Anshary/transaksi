import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed pelanggan
  const pelangganData = [
    { id_pelanggan: 1, nama: 'Budi Santoso', email: 'budi@email.com', telepon: '08120001' },
    { id_pelanggan: 2, nama: 'Siti Aminah', email: 'siti@email.com', telepon: '08120002' },
    { id_pelanggan: 3, nama: 'Andi Wijaya', email: 'andi@email.com', telepon: '08120003' },
    { id_pelanggan: 4, nama: 'Rina Melati', email: 'rina@email.com', telepon: '08120004' },
    { id_pelanggan: 5, nama: 'Joko Anwar', email: 'joko@email.com', telepon: '08120005' },
    { id_pelanggan: 6, nama: 'Maya Sari', email: 'maya@email.com', telepon: '08120006' },
    { id_pelanggan: 7, nama: 'Hendra Gunawan', email: 'hendra@email.com', telepon: '08120007' },
    { id_pelanggan: 8, nama: 'Lestari', email: 'lestari@email.com', telepon: '08120008' },
    { id_pelanggan: 9, nama: 'Reza Rahadian', email: 'reza@email.com', telepon: '08120009' },
    { id_pelanggan: 10, nama: 'Dian Sastro', email: 'dian@email.com', telepon: '08120010' },
    { id_pelanggan: 11, nama: 'Fajar Nugraha', email: 'fajar@email.com', telepon: '08120011' },
    { id_pelanggan: 12, nama: 'Putri Marino', email: 'putri@email.com', telepon: '08120012' },
  ]

  for (const p of pelangganData) {
    try {
      await prisma.pelanggan.upsert({
        where: { id_pelanggan: p.id_pelanggan },
        update: {},
        create: p,
      })
    } catch (e) {
      console.log(`Pelanggan ${p.nama} already exists`)
    }
  }

  // Seed produk
  const produkData = [
    { id_produk: 1, nama_produk: 'Laptop Asus', kategori: 'Elektronik', harga: 7500000 },
    { id_produk: 2, nama_produk: 'Mouse Wireless', kategori: 'Aksesoris', harga: 150000 },
    { id_produk: 3, nama_produk: 'Keyboard Mekanik', kategori: 'Aksesoris', harga: 450000 },
    { id_produk: 4, nama_produk: 'Monitor 24 Inch', kategori: 'Elektronik', harga: 1800000 },
    { id_produk: 5, nama_produk: 'Kabel HDMI', kategori: 'Aksesoris', harga: 50000 },
    { id_produk: 6, nama_produk: 'Flashdisk 64GB', kategori: 'Penyimpanan', harga: 90000 },
    { id_produk: 7, nama_produk: 'SSD 512GB', kategori: 'Penyimpanan', harga: 600000 },
    { id_produk: 8, nama_produk: 'RAM 8GB', kategori: 'Komponen', harga: 400000 },
    { id_produk: 9, nama_produk: 'Webcam 1080p', kategori: 'Elektronik', harga: 300000 },
    { id_produk: 10, nama_produk: 'Headset Gaming', kategori: 'Aksesoris', harga: 250000 },
    { id_produk: 11, nama_produk: 'Printer Inkjet', kategori: 'Elektronik', harga: 1200000 },
    { id_produk: 12, nama_produk: 'Tinta Hitam', kategori: 'Aksesoris', harga: 80000 },
  ]

  for (const p of produkData) {
    try {
      await prisma.produk.upsert({
        where: { id_produk: p.id_produk },
        update: {},
        create: p,
      })
    } catch (e) {
      console.log(`Produk ${p.nama_produk} already exists`)
    }
  }

  // Seed pesanan
  const pesananData = [
    { id_pesanan: 1, id_pelanggan: 1, tanggal_pesanan: new Date('2023-10-01 10:00:00'), total_harga: 7650000, status_pesanan: 'Diproses' },
    { id_pesanan: 2, id_pelanggan: 2, tanggal_pesanan: new Date('2023-10-02 11:30:00'), total_harga: 450000, status_pesanan: 'Diproses' },
    { id_pesanan: 3, id_pelanggan: 3, tanggal_pesanan: new Date('2023-10-03 09:15:00'), total_harga: 1850000, status_pesanan: 'Diproses' },
    { id_pesanan: 4, id_pelanggan: 4, tanggal_pesanan: new Date('2023-10-04 14:20:00'), total_harga: 600000, status_pesanan: 'Diproses' },
    { id_pesanan: 5, id_pelanggan: 5, tanggal_pesanan: new Date('2023-10-05 16:45:00'), total_harga: 700000, status_pesanan: 'Diproses' },
    { id_pesanan: 6, id_pelanggan: 6, tanggal_pesanan: new Date('2023-10-06 08:10:00'), total_harga: 150000, status_pesanan: 'Diproses' },
    { id_pesanan: 7, id_pelanggan: 7, tanggal_pesanan: new Date('2023-10-07 13:25:00'), total_harga: 1280000, status_pesanan: 'Diproses' },
    { id_pesanan: 8, id_pelanggan: 8, tanggal_pesanan: new Date('2023-10-08 15:50:00'), total_harga: 90000, status_pesanan: 'Diproses' },
    { id_pesanan: 9, id_pelanggan: 9, tanggal_pesanan: new Date('2023-10-09 10:40:00'), total_harga: 7950000, status_pesanan: 'Diproses' },
    { id_pesanan: 10, id_pelanggan: 10, tanggal_pesanan: new Date('2023-10-10 12:15:00'), total_harga: 400000, status_pesanan: 'Diproses' },
    { id_pesanan: 11, id_pelanggan: 11, tanggal_pesanan: new Date('2023-10-11 09:30:00'), total_harga: 250000, status_pesanan: 'Diproses' },
    { id_pesanan: 12, id_pelanggan: 12, tanggal_pesanan: new Date('2023-10-12 17:00:00'), total_harga: 2250000, status_pesanan: 'Diproses' },
  ]

  for (const p of pesananData) {
    try {
      await prisma.pesanan.upsert({
        where: { id_pesanan: p.id_pesanan },
        update: {},
        create: p,
      })
    } catch (e) {
      console.log(`Pesanan ${p.id_pesanan} already exists`)
    }
  }

  // Seed detail pesanan
  const detailData = [
    { id_detail: 1, id_pesanan: 1, id_produk: 1, jumlah: 1, subtotal: 7500000 },
    { id_detail: 2, id_pesanan: 1, id_produk: 2, jumlah: 1, subtotal: 150000 },
    { id_detail: 3, id_pesanan: 2, id_produk: 3, jumlah: 1, subtotal: 450000 },
    { id_detail: 4, id_pesanan: 3, id_produk: 4, jumlah: 1, subtotal: 1800000 },
    { id_detail: 5, id_pesanan: 3, id_produk: 5, jumlah: 1, subtotal: 50000 },
    { id_detail: 6, id_pesanan: 4, id_produk: 7, jumlah: 1, subtotal: 600000 },
    { id_detail: 7, id_pesanan: 5, id_produk: 8, jumlah: 1, subtotal: 400000 },
    { id_detail: 8, id_pesanan: 5, id_produk: 9, jumlah: 1, subtotal: 300000 },
    { id_detail: 9, id_pesanan: 6, id_produk: 2, jumlah: 1, subtotal: 150000 },
    { id_detail: 10, id_pesanan: 7, id_produk: 11, jumlah: 1, subtotal: 1200000 },
    { id_detail: 11, id_pesanan: 7, id_produk: 12, jumlah: 1, subtotal: 80000 },
    { id_detail: 12, id_pesanan: 8, id_produk: 6, jumlah: 1, subtotal: 90000 },
    { id_detail: 13, id_pesanan: 9, id_produk: 1, jumlah: 1, subtotal: 7500000 },
    { id_detail: 14, id_pesanan: 9, id_produk: 3, jumlah: 1, subtotal: 450000 },
    { id_detail: 15, id_pesanan: 10, id_produk: 8, jumlah: 1, subtotal: 400000 },
    { id_detail: 16, id_pesanan: 11, id_produk: 10, jumlah: 1, subtotal: 250000 },
    { id_detail: 17, id_pesanan: 12, id_produk: 4, jumlah: 1, subtotal: 1800000 },
    { id_detail: 18, id_pesanan: 12, id_produk: 3, jumlah: 1, subtotal: 450000 },
  ]

  for (const d of detailData) {
    try {
      await prisma.detailPesanan.upsert({
        where: { id_detail: d.id_detail },
        update: {},
        create: d,
      })
    } catch (e) {
      console.log(`Detail ${d.id_detail} already exists`)
    }
  }

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })