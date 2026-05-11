import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database URL not configured' },
        { status: 500 }
      )
    }

    const pesanan = await prisma.pesanan.findMany({
      include: {
        pelanggan: true,
        detail: {
          include: {
            produk: true
          }
        }
      },
      orderBy: {
        id_pesanan: 'desc'
      },
      take: 100
    })
    return NextResponse.json(pesanan)
  } catch (error) {
    console.error('Pesanan fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders', details: String(error) },
      { status: 500 }
    )
  }
}