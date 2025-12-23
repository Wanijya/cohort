import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from './components/ProductCard'
import './App.css'

const sampleProduct = {
  _id: '694a775172a11fee64ecd4f0',
  image:
    'https://images.unsplash.com/photo-1585159650922-4f7e634cefbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'test_description',
  price: { amount: 100, currency: 'INR' },
}

const App = () => {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products/get-item')
      .then((response) => {
        setProduct(response.data.product)
      })
      .catch(() => {
        // fallback to sample product when API is unavailable
        setProduct(sampleProduct)
      })
  }, [])

  function handleBuy(p) {
    // simple feedback — in real app you'd integrate payment flow
    alert(`Purchased: ${p.description} for ${p.price.currency} ${p.price.amount.toLocaleString()}`)
    console.log('buy', p)
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Product</h1>
        <p className="app-sub">A modern, seamless product card demo</p>
      </header>

      <main className="app-main">
        {product ? (
          <ProductCard product={product} onBuy={handleBuy} />
        ) : (
          <div className="loading">Loading…</div>
        )}
      </main>
    </div>
  )
}

export default App