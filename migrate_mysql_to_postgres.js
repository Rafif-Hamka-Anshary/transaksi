const { Client } = require('pg')
const mysql = require('mysql2/promise')

async function migrateMySQLToPostgreSQL() {
  // Konfigurasi koneksi MySQL (sesuaikan dengan database Anda)
  const mysqlConfig = {
    host: 'localhost',
    user: 'root', // ganti dengan username MySQL Anda
    password: '', // ganti dengan password MySQL Anda
    database: 'db_transaksi_publik'
  }

  // Konfigurasi koneksi PostgreSQL (sesuaikan dengan database Anda)
  const postgresConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  }

  let mysqlConnection
  let postgresClient

  try {
    console.log('🔄 Connecting to MySQL...')
    mysqlConnection = await mysql.createConnection(mysqlConfig)

    console.log('🔄 Connecting to PostgreSQL...')
    postgresClient = new Client(postgresConfig)
    await postgresClient.connect()

    // Migrasi tabel pelanggan
    console.log('📋 Migrating pelanggan...')
    const [pelangganRows] = await mysqlConnection.execute('SELECT * FROM pelanggan')
    for (const row of pelangganRows) {
      await postgresClient.query(
        'INSERT INTO pelanggan (id_pelanggan, nama, email, telepon) VALUES ($1, $2, $3, $4) ON CONFLICT (id_pelanggan) DO NOTHING',
        [row.id_pelanggan, row.nama, row.email, row.telepon]
      )
    }

    // Migrasi tabel produk
    console.log('📦 Migrating produk...')
    const [produkRows] = await mysqlConnection.execute('SELECT * FROM produk')
    for (const row of produkRows) {
      await postgresClient.query(
        'INSERT INTO produk (id_produk, nama_produk, kategori, harga) VALUES ($1, $2, $3, $4) ON CONFLICT (id_produk) DO NOTHING',
        [row.id_produk, row.nama_produk, row.kategori, parseFloat(row.harga)]
      )
    }

    // Migrasi tabel pesanan
    console.log('🛒 Migrating pesanan...')
    const [pesananRows] = await mysqlConnection.execute('SELECT * FROM pesanan')
    for (const row of pesananRows) {
      await postgresClient.query(
        'INSERT INTO pesanan (id_pesanan, id_pelanggan, tanggal_pesanan, total_harga, status_pesanan) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id_pesanan) DO NOTHING',
        [row.id_pesanan, row.id_pelanggan, row.tanggal_pesanan, parseFloat(row.total_harga), row.status_pesanan]
      )
    }

    // Migrasi tabel detail_pesanan
    console.log('📋 Migrating detail_pesanan...')
    const [detailRows] = await mysqlConnection.execute('SELECT * FROM detail_pesanan')
    for (const row of detailRows) {
      await postgresClient.query(
        'INSERT INTO detail_pesanan (id_detail, id_pesanan, id_produk, jumlah, subtotal) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id_detail) DO NOTHING',
        [row.id_detail, row.id_pesanan, row.id_produk, row.jumlah, parseFloat(row.subtotal)]
      )
    }

    // Reset sequences
    console.log('🔄 Resetting sequences...')
    await postgresClient.query("SELECT setval('pelanggan_id_pelanggan_seq', (SELECT COALESCE(MAX(id_pelanggan), 0) FROM pelanggan))")
    await postgresClient.query("SELECT setval('produk_id_produk_seq', (SELECT COALESCE(MAX(id_produk), 0) FROM produk))")
    await postgresClient.query("SELECT setval('pesanan_id_pesanan_seq', (SELECT COALESCE(MAX(id_pesanan), 0) FROM pesanan))")
    await postgresClient.query("SELECT setval('detail_pesanan_id_detail_seq', (SELECT COALESCE(MAX(id_detail), 0) FROM detail_pesanan))")

    console.log('✅ Migration completed successfully!')

  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    if (mysqlConnection) await mysqlConnection.end()
    if (postgresClient) await postgresClient.end()
  }
}

// Jalankan migrasi jika file ini dieksekusi langsung
if (require.main === module) {
  migrateMySQLToPostgreSQL()
}

module.exports = { migrateMySQLToPostgreSQL }