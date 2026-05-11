# 🚀 Panduan Setup Database untuk Vercel Deployment

## 📋 Status Database Saat Ini

❌ **DATABASE_URL belum siap** - Anda memberikan database MySQL, tapi Vercel membutuhkan PostgreSQL

## 🔄 Mengapa Perlu Konversi?

- **Vercel** hanya mendukung **PostgreSQL** untuk database production
- Schema Prisma sudah dikonfigurasi untuk PostgreSQL
- Data types sudah kompatibel, hanya perlu migrasi struktur

## 🛠️ Opsi Database PostgreSQL (Pilih Salah Satu)

### **Opsi 1: Supabase (Rekomendasi - Gratis & Mudah)**
1. Buka https://supabase.com
2. Sign up/Login
3. Create new project
4. Pilih region (Asia Southeast untuk performa terbaik)
5. Tunggu setup selesai (2-3 menit)
6. Copy connection string dari Settings → Database

### **Opsi 2: Vercel Postgres (Built-in)**
1. Di Vercel dashboard → Storage → Create Database → Postgres
2. Pilih region
3. Copy DATABASE_URL dari .env.local tab

### **Opsi 3: Neon (Serverless PostgreSQL)**
1. Buka https://neon.tech
2. Create account
3. Create new project
4. Copy connection string

### **Opsi 4: Railway**
1. Buka https://railway.app
2. Create project
3. Add PostgreSQL database
4. Copy DATABASE_URL

---

## 📊 Langkah Setup Database

### **Step 1: Pilih Provider & Buat Database**
Pilih salah satu opsi di atas dan buat database PostgreSQL baru.

### **Step 2: Setup Schema**
Jalankan SQL script berikut di database PostgreSQL Anda:

```sql
-- Copy paste isi file database_postgresql.sql ke SQL editor database Anda
```

Atau gunakan file `database_postgresql.sql` yang sudah dibuat.

### **Step 3: Setup Environment Variable**
Di Vercel dashboard → Project Settings → Environment Variables:

```
Name: DATABASE_URL
Value: postgresql://[username]:[password]@[host]:[port]/[database]
Environments: Production, Preview, Development
```

### **Step 4: Deploy**
Push kode ke GitHub dan deploy di Vercel.

---

## 🔄 Migrasi Data dari MySQL (Opsional)

Jika ingin migrasi data dari MySQL lokal ke PostgreSQL:

### **Persiapan:**
1. Pastikan MySQL server running
2. Install dependencies: `npm install mysql2 pg`

### **Konfigurasi Migrasi:**
Edit file `migrate_mysql_to_postgres.js`:
```javascript
const mysqlConfig = {
  host: 'localhost',
  user: 'root', // ganti dengan username MySQL Anda
  password: '', // ganti dengan password MySQL Anda
  database: 'db_transaksi_publik'
}
```

### **Jalankan Migrasi:**
```bash
# Setup DATABASE_URL di .env.local terlebih dahulu
node migrate_mysql_to_postgres.js
```

---

## 🧪 Testing Koneksi Database

Test koneksi dengan perintah:

```bash
# Generate Prisma client
npm run db:generate

# Push schema ke database
npm run db:push

# Jalankan development server
npm run dev
```

---

## 📞 Troubleshooting

### Error: "Can't reach database server"
- ✅ Cek DATABASE_URL format benar
- ✅ Pastikan database server accessible dari internet
- ✅ Untuk Supabase: pastikan RLS (Row Level Security) dimatikan untuk tabel

### Error: "relation does not exist"
- ✅ Jalankan `npm run db:push` untuk membuat tabel
- ✅ Atau jalankan SQL script `database_postgresql.sql`

### Error: "SSL connection error"
- ✅ Tambahkan `?sslmode=require` di akhir DATABASE_URL
- ✅ Contoh: `postgresql://user:pass@host:port/db?sslmode=require`

---

## 📱 Format DATABASE_URL

### Supabase:
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

### Vercel Postgres:
```
postgresql://default:[password]@ep-[id]-[region].aws.neon.tech:5432/verceldb?sslmode=require
```

### Neon:
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

---

## ✅ Checklist Setup

- [ ] Database PostgreSQL dibuat
- [ ] Schema tabel dibuat (jalankan `database_postgresql.sql`)
- [ ] DATABASE_URL diset di Vercel environment variables
- [ ] Kode di-push ke GitHub
- [ ] Deploy di Vercel berhasil
- [ ] Aplikasi menampilkan data

---

**🎯 Ready to deploy setelah setup database! 🚀**