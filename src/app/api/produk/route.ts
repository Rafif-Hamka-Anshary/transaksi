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

    const produk = await prisma.produk.findMany({
      orderBy: {
        id_produk: 'desc'
      },
      take: 100
    })
    return NextResponse.json(produk)
  } catch (error) {
    console.error('Produk fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', details: String(error) },
      { status: 500 }
    )
  }
}