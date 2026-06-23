import React, {useEffect, useState} from 'react'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'

const SAMPLE = [
  {id:1,title:'Wireless Headphones',price:39.99,img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
  {id:2,title:'Running Shoes',price:59.99,img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=800&auto=format&fit=crop'},
  {id:3,title:'Smart Lamp',price:24.5,img:'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
  {id:4,title:'Coffee Maker',price:79.0,img:'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop'},
  {id:5,title:'Sunglasses',price:18.99,img:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800&auto=format&fit=crop'},
  {id:6,title:'Backpack',price:45.0,img:'https://plus.unsplash.com/premium_photo-1678739395192-bfdd13322d34?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
  {id:7,title:'Wrist Watch',price:129.0,img:'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
  {id:8,title:'Notebook',price:9.99,img:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop'}
]

const STORAGE_KEY = 'react_amazon_cart'

export default function App(){
  const [products] = useState(SAMPLE)
  const [cart, setCart] = useState({})
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw) setCart(JSON.parse(raw))
    }catch(e){console.error(e)}
  },[])

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  },[cart])

  function addToCart(p){
    setCart(prev=>{
      const next = {...prev}
      if(!next[p.id]) {
        next[p.id] = {...p, qty:1}
      } else {
        next[p.id].qty += 1
      }
      return next
    })
  }

  function updateQty(id, delta){
    setCart(prev=>{
      const next = {...prev}
      if(!next[id]) return prev
      next[id].qty += delta
      if(next[id].qty <= 0) delete next[id]
      return next
    })
  }

  function removeItem(id){
    setCart(prev=>{
      const next = {...prev}
      delete next[id]
      return next
    })
  }

  const count = Object.values(cart).reduce((s,i)=>s+i.qty,0)
  const total = Object.values(cart).reduce((s,i)=>s+i.qty*i.price,0)

  React.useEffect(()=>{
    function handleEsc(e){
      if(e.key==='Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return ()=>window.removeEventListener('keydown', handleEsc)
  },[])

  return (
    <div>
      <header className="site-header">
        <div className="brand">amazon</div>
        <div className="search"> 
          <input placeholder="Search Amazon" />
        </div>
        <div className="actions">
          <div className="signin">Sign in</div>
          <button className="cart" onClick={()=>setOpen(v=>!v)} style={{background:'none',border:'none',color:'#fff',cursor:'pointer',fontSize:'14px'}}>Cart ({count})</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <h1>PICK GREAT DEALS</h1>
            <p>Find great products for home, tech and lifestyle.</p>
            <button className="primary">Shop now</button>
          </div>
          <div className="hero-image" />
        </section>

        <section className="product-area">
          <h2>Popular picks</h2>
          <div className="products">
            {products.map(p=> (
              <ProductCard key={p.id} product={p} onAdd={()=>addToCart(p)} />
            ))}
          </div>
        </section>
      </main>

      <Cart open={open} items={cart} onInc={(id)=>updateQty(id,1)} onDec={(id)=>updateQty(id,-1)} onRemove={removeItem} total={total} />
      {open && <div className="cart-backdrop" onClick={()=>setOpen(false)} />}
    </div>
  )
}
