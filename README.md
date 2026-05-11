# Website Transaksi

Website dashboard untuk menampilkan data transaksi dari database menggunakan Next.js, Tailwind CSS, dan Prisma.

## Fitur

- Dashboard dengan statistik transaksi
- Tabel daftar pesanan dengan detail pelanggan
- Tabel daftar produk
- API endpoints untuk data transaksi
- Responsive design dengan Tailwind CSS
- Error handling yang comprehensive
- Loading states yang user-friendly

## Teknologi

- **Framework**: Next.js 16.2.6 dengan App Router
- **Styling**: Tailwind CSS 4
- **Database**: Prisma ORM dengan PostgreSQL
- **Deployment**: Vercel
- **Language**: TypeScript

## Quick Start

```bash
# Install dependencies
npm install

# Setup database schema
npm run db:push

# Seed sample data (optional)
npm run db:seed

# Start development server
npm run dev
```

Akses aplikasi di http://localhost:3000

## Environment Variables

Buat file `.env.local` di root folder:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/transaksi"
NODE_ENV=development
```

## Setup Database

### Development (PostgreSQL Lokal)
1. Install PostgreSQL
2. Buat database baru
3. Update `.env.local` dengan connection string
4. Jalankan `npm run db:push`
5. (Optional) Jalankan `npm run db:seed` untuk sample data

### Production (Vercel dengan External PostgreSQL)
1. Setup PostgreSQL server (Supabase, Railway, Neon, dll)
2. Copy connection string
3. Di Vercel dashboard → Project Settings → Environment Variables
4. Tambah variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your PostgreSQL connection string
   - **Environments**: Production, Preview, Development
5. Deploy

## Deploy ke Vercel

Lihat [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) untuk panduan lengkap.

**TL;DR**:
1. `git push` ke GitHub
2. Connect repo di Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy

## Troubleshooting

### Error saat deploy
- Pastikan `DATABASE_URL` sudah diset di Vercel environment variables
- Check Vercel Logs untuk error details
- Pastikan database server accessible dari Vercel

### Data tidak tampil
- Verifikasi `DATABASE_URL` format benar
- Check bahwa database sudah di-setup dengan schema
- Lihat browser console untuk error messages

Untuk bantuan lengkap, lihat [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main dashboard
│   ├── globals.css        # Global styles
│   └── api/
│       ├── pesanan/       # Orders API endpoint
│       └── produk/        # Products API endpoint
└── lib/
    └── prisma.ts          # Prisma client config
```

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Sync database schema
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database

---

**Status**: ✅ Ready for Vercel Deployment

> Jika repo masih tidak muncul di Vercel, gunakan GitHub integration ulang atau import repositori secara manual dari akun GitHub yang benar.

## API Endpoints

- `GET /api/pesanan` - Mendapatkan semua pesanan dengan detail
- `GET /api/produk` - Mendapatkan semua produk

## Struktur Database

- `pelanggan` - Data pelanggan
- `produk` - Data produk
- `pesanan` - Header pesanan
- `detail_pesanan` - Detail item dalam pesanan
