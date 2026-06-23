import React from 'react'

export default function Cart({open, items, onInc, onDec, onRemove, total}){
  const arr = Object.values(items)
  return (
    <aside className={open? 'cart-panel open' : 'cart-panel'} aria-hidden={!open}>
      <h3>Your Cart</h3>
      <div id="cartItems">
        {arr.length===0 && <div style={{padding:'12px'}}>Cart is empty</div>}
        {arr.map(it=> (
          <div className="cart-item" key={it.id}>
            <img src={it.img} alt={it.title} />
            <div className="meta">
              <div><strong>{it.title}</strong></div>
              <div>${it.price.toFixed(2)}</div>
              <div>
                Qty: 
                <button onClick={()=>onDec(it.id)} style={{margin:'0 4px',padding:'2px 6px',cursor:'pointer'}}>−</button>
                {it.qty}
                <button onClick={()=>onInc(it.id)} style={{margin:'0 4px',padding:'2px 6px',cursor:'pointer'}}>+</button>
              </div>
            </div>
            <div><button onClick={()=>onRemove(it.id)} style={{padding:'4px 8px',cursor:'pointer'}}>Remove</button></div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div><strong>Total: ${total.toFixed(2)}</strong></div>
        <button onClick={()=>alert('Checkout demo: '+arr.reduce((s,i)=>s+i.qty,0)+' items. Total: $'+total.toFixed(2))} style={{background:'#ff9900',color:'#fff',border:'none',padding:'10px 16px',borderRadius:'6px',cursor:'pointer',fontWeight:'600',flex:1,marginLeft:'8px'}}>Checkout</button>
      </div>
    </aside>
  )
}
