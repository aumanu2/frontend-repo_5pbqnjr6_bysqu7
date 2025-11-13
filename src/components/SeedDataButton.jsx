import React from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const sampleProducts = [
  {
    title: 'T-Shirt Bra Lightly Padded - Coral Pink',
    description: 'Everyday comfort T-shirt bra with smooth cups and soft straps',
    price: 1099,
    compare_at_price: 1499,
    category: 'Bras',
    subcategory: 'T-Shirt Bra',
    rating: 4.4,
    rating_count: 124,
    tags: ['everyday', 'smooth'],
    variants: [
      { size: '32B', color: 'Coral', stock: 10 },
      { size: '34B', color: 'Coral', stock: 8 },
      { size: '36C', color: 'Coral', stock: 5 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1591375372275-3d69f3ea8783?q=80&w=1200&auto=format&fit=crop', alt: 'Coral bra' }
    ]
  },
  {
    title: 'Non-Wired Full Coverage Bra - Black',
    description: 'Supportive non-wired bra for all-day comfort',
    price: 999,
    category: 'Bras',
    subcategory: 'Full Coverage',
    rating: 4.2,
    rating_count: 87,
    variants: [
      { size: '34B', color: 'Black', stock: 6 },
      { size: '36C', color: 'Black', stock: 7 },
      { size: '38D', color: 'Black', stock: 3 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1615208429553-cabb4dc5f381?q=80&w=1200&auto=format&fit=crop', alt: 'Black bra' }
    ]
  },
  {
    title: 'Sports Bra High Impact - Teal',
    description: 'High-impact support with breathable fabric and racerback',
    price: 1299,
    compare_at_price: 1799,
    category: 'Bras',
    subcategory: 'Sports Bra',
    rating: 4.6,
    rating_count: 203,
    tags: ['sports', 'high-impact'],
    variants: [
      { size: 'S', color: 'Teal', stock: 12 },
      { size: 'M', color: 'Teal', stock: 9 },
      { size: 'L', color: 'Teal', stock: 4 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop', alt: 'Teal sports bra' }
    ]
  }
]

export default function SeedDataButton() {
  const seed = async () => {
    await fetch(`${BACKEND_URL}/api/products/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sampleProducts)
    })
    alert('Sample products seeded. Refresh to see them.')
  }

  return (
    <button onClick={seed} className="fixed bottom-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg">
      Seed Sample Products
    </button>
  )
}
