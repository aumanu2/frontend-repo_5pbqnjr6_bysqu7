import React, { useEffect, useMemo, useState } from 'react'
import { ShoppingCart, SlidersHorizontal, Search } from 'lucide-react'
import ProductCard from './components/ProductCard'
import SeedDataButton from './components/SeedDataButton'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useProducts() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ category: 'Bras', limit: 24 })

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch(`${BACKEND_URL}/api/products/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...filters, page })
    })
    const data = await res.json()
    setItems(data.items || [])
    setTotal(data.total || 0)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [page, JSON.stringify(filters)])

  return { items, total, loading, page, setPage, filters, setFilters }
}

export default function App() {
  const { items, total, loading, page, setPage, filters, setFilters } = useProducts()
  const [query, setQuery] = useState('')

  const pages = useMemo(() => Math.max(1, Math.ceil(total / (filters.limit || 24))), [total, filters.limit])

  const applySearch = () => {
    setFilters({ ...filters, search: query, page: 1 })
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-pink-600 font-extrabold text-xl">enamor</span>
            <nav className="hidden md:flex gap-5 ml-6 text-sm text-gray-700">
              <a className="hover:text-pink-600" href="#">Bras</a>
              <a className="hover:text-pink-600" href="#">Panties</a>
              <a className="hover:text-pink-600" href="#">Sleepwear</a>
              <a className="hover:text-pink-600" href="#">Sports</a>
            </nav>
          </div>
          <div className="flex items-center gap-3 w-full max-w-md">
            <div className="flex-1 relative">
              <input value={query} onChange={(e)=>setQuery(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && applySearch()} className="w-full pl-9 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Search bras, styles, sizes..." />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button onClick={applySearch} className="px-3 py-2 bg-pink-600 text-white rounded-lg">Search</button>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 inline-flex items-center justify-center rounded-full">0</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 hidden md:block">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 uppercase">Price</h4>
                  <div className="mt-2 flex items-center gap-2">
                    <input type="number" className="w-20 px-2 py-1 border rounded" placeholder="Min" onChange={(e)=> setFilters(f=>({...f, price_min: e.target.value? Number(e.target.value): undefined }))} />
                    <span className="text-gray-400">-</span>
                    <input type="number" className="w-20 px-2 py-1 border rounded" placeholder="Max" onChange={(e)=> setFilters(f=>({...f, price_max: e.target.value? Number(e.target.value): undefined }))} />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 uppercase">Sort by</h4>
                  <select className="mt-2 w-full border rounded px-2 py-1" onChange={(e)=> setFilters(f=>({...f, sort: e.target.value || undefined }))}>
                    <option value="">Recommended</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Bras</h2>
              <div className="text-sm text-gray-600">{total} products</div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl p-3 h-72" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {items.map((item) => (
                  <ProductCard key={item._id} product={item} onClick={()=>{}} />
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-2">
              <button disabled={page===1} onClick={()=>setPage(page-1)} className="px-3 py-2 rounded border disabled:opacity-50">Prev</button>
              <span className="text-sm">Page {page} of {pages}</span>
              <button disabled={page===pages} onClick={()=>setPage(page+1)} className="px-3 py-2 rounded border disabled:opacity-50">Next</button>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-sm text-gray-500">© 2025 Enamor-inspired Store (Demo)</footer>

      <SeedDataButton />
    </div>
  )
}
