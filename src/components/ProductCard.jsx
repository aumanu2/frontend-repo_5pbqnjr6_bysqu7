import React from 'react'

export default function ProductCard({ product, onClick }) {
  const price = product.price?.toFixed(2)
  const compare = product.compare_at_price && product.compare_at_price > product.price
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 cursor-pointer" onClick={onClick}>
      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
        <img src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1200&auto=format&fit=crop'} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{product.title}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-pink-600 font-semibold">₹{price}</span>
          {compare && (
            <span className="text-xs text-gray-400 line-through">₹{product.compare_at_price.toFixed(2)}</span>
          )}
        </div>
        {product.rating && (
          <div className="mt-1 text-xs text-yellow-600">★ {product.rating.toFixed(1)} ({product.rating_count || 0})</div>
        )}
      </div>
    </div>
  )
}
