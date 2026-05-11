'use client'

import { useEffect, useState } from 'react'

interface Pesanan {
  id_pesanan: number
  tanggal_pesanan: string
  total_harga: number
  status_pesanan: string
  pelanggan: {
    nama: string
    email: string
  }
  detail: {
    jumlah: number
    subtotal: number
    produk: {
      nama_produk: string
      harga: number
    }
  }[]
}

interface Produk {
  id_produk: number
  nama_produk: string
  kategori: string
  harga: number
}

export default function Home() {
  const [pesanan, setPesanan] = useState<Pesanan[]>([])
  const [produk, setProduk] = useState<Produk[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [pesananRes, produkRes] = await Promise.all([
          fetch('/api/pesanan'),
          fetch('/api/produk')
        ])

        if (!pesananRes.ok || !produkRes.ok) {
          throw new Error('API request failed')
        }

        const pesananData = await pesananRes.json()
        const produkData = await produkRes.json()

        setPesanan(Array.isArray(pesananData) ? pesananData : [])
        setProduk(Array.isArray(produkData) ? produkData : [])
      } catch (error) {
        console.error('Failed to fetch data:', error)
        setError('Gagal memuat data. Pastikan DATABASE_URL sudah dikonfigurasi di Vercel.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
          <h2 className="text-xl font-bold text-red-800 mb-4">Error</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard Transaksi</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Pesanan</h3>
            <p className="text-3xl font-bold text-blue-600">{pesanan.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Produk</h3>
            <p className="text-3xl font-bold text-green-600">{produk.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Pendapatan</h3>
            <p className="text-3xl font-bold text-purple-600">
              Rp {pesanan.reduce((sum, p) => sum + Number(p.total_harga), 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Pesanan Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Daftar Pesanan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Pelanggan</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tanggal</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {pesanan.map((p) => (
                  <tr key={p.id_pesanan} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-900">{p.id_pesanan}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{p.pelanggan?.nama}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {new Date(p.tanggal_pesanan).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      Rp {Number(p.total_harga).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        p.status_pesanan === 'Diproses' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {p.status_pesanan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Produk Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Daftar Produk</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama Produk</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Kategori</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Harga</th>
                </tr>
              </thead>
              <tbody>
                {produk.map((p) => (
                  <tr key={p.id_produk} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-900">{p.id_produk}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{p.nama_produk}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{p.kategori}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      Rp {Number(p.harga).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
