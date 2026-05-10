# Website Transaksi

Website dashboard untuk menampilkan data transaksi dari database menggunakan Next.js, Tailwind CSS, dan Prisma.

## Fitur

- Dashboard dengan statistik transaksi
- Tabel daftar pesanan dengan detail pelanggan
- Tabel daftar produk
- API endpoints untuk data transaksi
- Responsive design dengan Tailwind CSS

## Teknologi

- **Framework**: Next.js 15 dengan App Router
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM dengan PostgreSQL (Vercel Postgres)
- **Deployment**: Vercel

## Setup Database

### Development (PostgreSQL Lokal)
1. Install PostgreSQL di lokal
2. Buat database baru
3. Update `.env`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/transaksi_db?schema=public"
   ```
4. Jalankan:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

### Production (Vercel Postgres)
1. Di Vercel dashboard, buat Postgres database
2. Copy DATABASE_URL dari Vercel
3. Set environment variable `DATABASE_URL` di Vercel project settings
4. Deploy akan otomatis menjalankan migrate dan seed

## Deploy ke Vercel

1. Push kode ke GitHub
2. Connect repository ke Vercel
3. Set environment variable DATABASE_URL di Vercel
4. Deploy
3. Setup environment variables di Vercel:
   - `DATABASE_URL`: URL Vercel Postgres database
4. Deploy

> Jika repo masih tidak muncul di Vercel, gunakan GitHub integration ulang atau import repositori secara manual dari akun GitHub yang benar.

## API Endpoints

- `GET /api/pesanan` - Mendapatkan semua pesanan dengan detail
- `GET /api/produk` - Mendapatkan semua produk

## Struktur Database

- `pelanggan` - Data pelanggan
- `produk` - Data produk
- `pesanan` - Header pesanan
- `detail_pesanan` - Detail item dalam pesanan
