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

## Setup Development

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup database:
   - Untuk development, gunakan SQLite:
     - Ubah `prisma/schema.prisma` provider ke "sqlite"
     - Jalankan `npx prisma generate`
     - Jalankan `npx prisma db push`

   - Untuk production (Vercel), gunakan PostgreSQL:
     - Setup Vercel Postgres
     - Update `DATABASE_URL` di environment variables

4. Jalankan development server:
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000)

## Deploy ke Vercel

1. Push kode ke GitHub
2. Connect repository ke Vercel
3. Setup environment variables di Vercel:
   - `DATABASE_URL`: URL Vercel Postgres database
4. Deploy

## API Endpoints

- `GET /api/pesanan` - Mendapatkan semua pesanan dengan detail
- `GET /api/produk` - Mendapatkan semua produk

## Struktur Database

- `pelanggan` - Data pelanggan
- `produk` - Data produk
- `pesanan` - Header pesanan
- `detail_pesanan` - Detail item dalam pesanan
