import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Task 6: Shopping Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // Task 5: Fetch Products
  const fetchProducts = () => {
    fetch(`${apiUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Task 6: Add Item to Cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true); // Open cart to show it was added
  };

  // Task 6: Remove Item from Cart
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Calculate Total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>PetKit Now 🐾</h1>
            <p>Premium Supplies for Your Furry Friends</p>
          </div>
          <button className="cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
            🛒 Cart ({cart.length})
          </button>
        </div>
      </header>

      {/* Task 6: Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer">
          <div className="cart-header">
            <h3>Your Shopping Cart</h3>
            <button onClick={() => setIsCartOpen(false)}>×</button>
          </div>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', margin: '2rem 0' }}>Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <span>{item.name}</span>
                    <div>
                      <span className="price">${item.price.toFixed(2)}</span>
                      <button onClick={() => removeFromCart(index)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <strong>Total:</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button className="checkout-btn" onClick={() => alert('Moving to Task 7: Checkout Form!')}>
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      )}

      {/* Task 5: Product Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', opacity: 0.5 }}>Loading premium supplies...</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <div key={product.id} className="card">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <div className="price-row">
                <span className="price">${product.price.toFixed(2)}</span>
                <button className="add-btn" onClick={() => addToCart(product)}>+ Add</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task 6 extra styles */}
      <style>{`
        .cart-btn {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 1rem;
          font-weight: 700;
          cursor: pointer;
        }
        .add-btn {
          background: #f0f4e8;
          color: var(--primary);
          border: 1px solid var(--primary);
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .add-btn:hover { background: var(--primary); color: white; }

        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 350px;
          height: 100vh;
          background: white;
          box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          z-index: 1000;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }
        .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        .cart-header h3 { color: var(--primary); }
        .cart-header button { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
        
        .cart-items { flex-grow: 1; overflow-y: auto; }
        .cart-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #f9f9f9; padding-bottom: 0.5rem; }
        .cart-item span { font-weight: 600; }
        .cart-item .price { color: var(--primary); margin-right: 1rem; font-size: 0.9rem; }
        .cart-item button { background: none; border: none; color: #ef4444; font-size: 0.8rem; cursor: pointer; }

        .cart-total { display: flex; justify-content: space-between; padding: 1.5rem 0; border-top: 2px solid #f0f4e8; margin-top: 1rem; font-size: 1.2rem; }
        .checkout-btn { background: var(--primary); color: white; border: none; padding: 1.2rem; border-radius: 1rem; font-weight: 700; cursor: pointer; }
      `}</style>
    </div>
  );
}

export default App;
