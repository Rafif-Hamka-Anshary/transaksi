const { Client } = require('pg')

async function testDatabaseConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  })

  try {
    console.log('🔄 Testing database connection...')
    await client.connect()

    // Test query sederhana
    const result = await client.query('SELECT NOW() as current_time')
    console.log('✅ Database connected successfully!')
    console.log('🕒 Server time:', result.rows[0].current_time)

    // Cek apakah tabel ada
    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('pelanggan', 'produk', 'pesanan', 'detail_pesanan')
      ORDER BY table_name
    `)

    console.log('📋 Tables found:', tables.rows.map(row => row.table_name))

    // Hitung jumlah data di setiap tabel
    const counts = {}
    for (const table of ['pelanggan', 'produk', 'pesanan', 'detail_pesanan']) {
      const result = await client.query(`SELECT COUNT(*) as count FROM ${table}`)
      counts[table] = result.rows[0].count
    }

    console.log('📊 Data counts:')
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`  ${table}: ${count} records`)
    })

    // Test query aplikasi
    console.log('🧪 Testing application queries...')
    const pesananResult = await client.query(`
      SELECT COUNT(*) as total_pesanan,
             SUM(total_harga) as total_revenue
      FROM pesanan
    `)
    console.log('💰 Total orders:', pesananResult.rows[0].total_pesanan)
    console.log('💵 Total revenue: Rp', pesananResult.rows[0].total_revenue?.toLocaleString() || 0)

  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.error('💡 Make sure DATABASE_URL is set correctly')
    process.exit(1)
  } finally {
    await client.end()
  }
}

// Jalankan test jika file ini dieksekusi langsung
if (require.main === module) {
  testDatabaseConnection()
}

module.exports = { testDatabaseConnection }