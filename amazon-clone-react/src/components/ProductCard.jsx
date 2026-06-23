import React from 'react'

export default function ProductCard({product,onAdd}){
  return (
    <div className="product">
      <img src={product.img} alt={product.title} />
      <h4>{product.title}</h4>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={onAdd} style={{width:'100%',padding:'10px',background:'#ffd39f',border:'none',borderRadius:'6px',cursor:'pointer',fontWeight:'600'}}>Add to Cart</button>
    </div>
  )
}
