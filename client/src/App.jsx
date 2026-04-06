import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Shopping Cart & Flow State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Task 7: Customer & Pet Information State
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [petName, setPetName] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';

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

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Task 7: Handle Checkout Click
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 onClick={() => setIsCheckoutOpen(false)} style={{ cursor: 'pointer' }}>
              PetKit Now 🐾
            </h1>
            <p>Premium Supplies for Your Furry Friends</p>
          </div>
          {!isCheckoutOpen && (
            <button className="cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
              🛒 Cart ({cart.length})
            </button>
          )}
        </div>
      </header>

      {/* Task 7: Checkout Form Page */}
      {isCheckoutOpen ? (
        <section className="checkout-page">
          <div className="checkout-card">
            <h2>Complete Your Order</h2>
            <p className="subtitle">Enter delivery details for you and your pet.</p>
            
            <div className="order-summary-mini">
              <span>Order Total: <strong>${total.toFixed(2)}</strong></span>
              <span>Items: {cart.length}</span>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Moving to Task 8: Order Submission!'); }}>
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Alex Smith" 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea 
                  placeholder="Where should we deliver?" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Pet's Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Buddy" 
                  value={petName} 
                  onChange={(e) => setPetName(e.target.value)} 
                  required 
                />
              </div>
              <div className="checkout-actions">
                <button type="button" className="btn-back" onClick={() => setIsCheckoutOpen(false)}>
                  ← Back to Shopping
                </button>
                <button type="submit" className="btn-submit">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : (
        /* Task 5 & 6: Main Grid and Cart Drawer */
        <>
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
                  <button className="checkout-btn" onClick={handleProceedToCheckout}>
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          )}

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
        </>
      )}

      {/* Task 7 Styles */}
      <style>{`
        .checkout-page { display: flex; justify-content: center; padding: 2rem 0; }
        .checkout-card { background: white; padding: 3rem; border-radius: 2rem; border: 1px solid var(--border); box-shadow: var(--shadow); width: 100%; max-width: 600px; }
        .checkout-card h2 { color: var(--primary); font-size: 2rem; margin-bottom: 0.5rem; }
        .checkout-card .subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        
        .order-summary-mini { background: #f0f4e8; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem; display: flex; justify-content: space-between; color: var(--primary); }

        .form-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; }
        .form-group label { font-weight: 600; margin-bottom: 0.5rem; color: var(--primary); font-size: 0.9rem; }
        .form-group input, .form-group textarea { padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--border); font-family: 'Outfit', sans-serif; font-size: 1rem; background: #fafafa; }
        .form-group textarea { height: 80px; }

        .checkout-actions { display: flex; gap: 1rem; margin-top: 2.5rem; }
        .btn-submit { flex: 2; padding: 1.25rem; background: var(--primary); color: white; border: none; border-radius: 1rem; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: transform 0.2s; }
        .btn-submit:hover { transform: scale(1.02); }
        .btn-back { flex: 1; padding: 1.25rem; background: none; color: var(--text-muted); border: 1px solid var(--border); border-radius: 1rem; font-weight: 600; cursor: pointer; }

        /* Existing Cart Styles */
        .cart-btn { background: var(--primary); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 1rem; font-weight: 700; cursor: pointer; }
        .add-btn { background: #f0f4e8; color: var(--primary); border: 1px solid var(--primary); padding: 0.4rem 1rem; border-radius: 2rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .add-btn:hover { background: var(--primary); color: white; }
        .cart-drawer { position: fixed; top: 0; right: 0; width: 350px; height: 100vh; background: white; box-shadow: -10px 0 30px rgba(0,0,0,0.1); z-index: 1000; padding: 2rem; display: flex; flex-direction: column; }
        .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        .cart-header h3 { color: var(--primary); }
        .cart-header button { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
        .cart-items { flex-grow: 1; overflow-y: auto; }
        .cart-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #f9f9f9; padding-bottom: 0.5rem; }
        .cart-item span { font-weight: 600; }
        .cart-item .price { color: var(--primary); margin-right: 1rem; font-size: 0.9rem; }
        .cart-item button { background: none; border: none; color: #ef4444; font-size: 0.8rem; cursor: pointer; }
        .cart-total { display: flex; justify-content: space-between; padding: 1.5rem 0; border-top: 2px solid #f0f4e8; margin-top: 1rem; font-size: 1.2rem; }
        .checkout-btn { background: var(--primary); color: white; border: none; padding: 1.2rem; border-radius: 1rem; font-weight: 700; cursor: pointer; width: 100%; }
      `}</style>
    </div>
  );
}

export default App;
