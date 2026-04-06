import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Shopping Cart & Flow State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Customer & Pet Information State
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [petName, setPetName] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const fetchProducts = () => {
    setLoading(true);
    fetch(`${apiUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
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

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Your cart is empty!');
    
    const orderData = {
      customerName,
      address,
      petName,
      totalAmount: total
    };

    fetch(`${apiUrl}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Order successful:', data);
        setOrderComplete(true);
        setCart([]); // Clear cart after success
      })
      .catch((err) => {
        console.error('Error placing order:', err);
        alert('Something went wrong with your order. Please try again.');
      });
  };

  return (
    <div className="container">
      <header>
        <div className="header-inner">
          <div className="logo-section" onClick={() => { setIsCheckoutOpen(false); setOrderComplete(false); }}>
            <h1>PetKit Now 🐾</h1>
            <p>Premium Supplies for Your Furry Friends</p>
          </div>
          {!isCheckoutOpen && !orderComplete && (
            <button className="cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
              🛒 Cart ({cart.length})
            </button>
          )}
        </div>
      </header>

      {/* Result Page: Order Success */}
      {orderComplete ? (
        <section className="success-page">
          <div className="checkout-card" style={{ textAlign: 'center' }}>
            <div className="success-icon">🐾</div>
            <h2>Order Received!</h2>
            <p className="subtitle">Thank you, {customerName}! We're preparing {petName}'s goodies for delivery.</p>
            <button className="btn-submit" onClick={() => { setOrderComplete(false); setIsCheckoutOpen(false); setCustomerName(''); setAddress(''); setPetName(''); }}>
              Back to Shopping
            </button>
          </div>
        </section>
      ) : isCheckoutOpen ? (
        /* Task 7 & 8: Checkout Form Page */
        <section className="checkout-page">
          <div className="checkout-card">
            <h2>Complete Your Order</h2>
            <p className="subtitle">Enter delivery details for you and your pet.</p>
            
            <div className="order-summary-mini">
              <span>Order Total: <strong>${total.toFixed(2)}</strong></span>
              <span>Items: {cart.length}</span>
            </div>

            <form onSubmit={handleSubmitOrder}>
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
            <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
              <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                  <h3>Your Shopping Cart</h3>
                  <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
                </div>
                {cart.length === 0 ? (
                  <div className="empty-cart-state">
                     <span style={{ fontSize: '3rem' }}>🛒</span>
                     <p>Your cart is empty.</p>
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                          <span>{item.name}</span>
                          <div className="cart-item-right">
                            <span className="price">${item.price.toFixed(2)}</span>
                            <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cart-total">
                      <span>Total Amount:</span>
                      <strong>${total.toFixed(2)}</strong>
                    </div>
                    <button className="checkout-btn" onClick={handleProceedToCheckout}>
                      Proceed to Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching premium supplies...</p>
            </div>
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

      {/* Task 7-10 Unified Styles */}
      <style>{`
        .header-inner { display: flex; justify-content: space-between; align-items: center; }
        .logo-section { cursor: pointer; transition: opacity 0.2s; }
        .logo-section:hover { opacity: 0.8; }
        
        .loading-state { text-align: center; padding: 5rem 0; opacity: 0.6; }
        .spinner { border: 4px solid #f3f3f3; border-top: 4px solid var(--primary); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 1rem auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .success-icon { font-size: 4rem; margin-bottom: 1rem; }
        .checkout-page, .success-page { display: flex; justify-content: center; padding: 2rem 0; animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .checkout-card { background: white; padding: 3rem; border-radius: 2rem; border: 1px solid var(--border); box-shadow: var(--shadow); width: 100%; max-width: 600px; }
        .checkout-card h2 { color: var(--primary); font-size: 2.2rem; margin-bottom: 0.5rem; letter-spacing: -1px; }
        .checkout-card .subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        
        .order-summary-mini { background: #f0f4e8; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem; display: flex; justify-content: space-between; color: var(--primary); font-weight: 600; }

        .form-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; }
        .form-group label { font-weight: 600; margin-bottom: 0.5rem; color: var(--primary); font-size: 0.9rem; }
        .form-group input, .form-group textarea { padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--border); font-family: 'Outfit', sans-serif; font-size: 1rem; background: #fafafa; transition: border-color 0.2s; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--primary); background: white; }
        .form-group textarea { height: 80px; resize: vertical; }

        .checkout-actions { display: flex; gap: 1rem; margin-top: 2.5rem; }
        .btn-submit { flex: 2; padding: 1.25rem; background: var(--primary); color: white; border: none; border-radius: 1rem; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: all 0.2s; }
        .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(85, 107, 47, 0.2); }
        .btn-back { flex: 1; padding: 1.25rem; background: none; color: var(--text-muted); border: 1px solid var(--border); border-radius: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .btn-back:hover { background: #f9f9f9; }

        /* Cart Drawer & Overlay */
        .cart-drawer-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); z-index: 999; backdrop-filter: blur(4px); }
        .cart-drawer { position: fixed; top: 0; right: 0; width: 380px; height: 100vh; background: white; box-shadow: -10px 0 30px rgba(0,0,0,0.1); z-index: 1000; padding: 2.5rem; display: flex; flex-direction: column; animation: slideIn 0.3s ease-out; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

        .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        .cart-header h3 { color: var(--primary); font-size: 1.4rem; }
        .close-btn { background: none; border: none; font-size: 2rem; color: var(--text-muted); cursor: pointer; line-height: 1; }
        
        .empty-cart-state { text-align: center; margin: 5rem 0; opacity: 0.5; }

        .cart-items { flex-grow: 1; overflow-y: auto; padding-right: 0.5rem; }
        .cart-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; padding-bottom: 1rem; border-bottom: 1px solid #f5f5f5; }
        .cart-item span { font-weight: 600; color: var(--text); }
        .cart-item-right { display: flex; flex-direction: column; align-items: flex-end; }
        .cart-item .price { color: var(--primary); font-weight: 700; margin-bottom: 0.3rem; }
        .remove-btn { background: none; border: none; color: #ef4444; font-size: 0.8rem; cursor: pointer; font-weight: 600; padding: 0.2rem 0; }

        .cart-total { display: flex; justify-content: space-between; padding: 1.5rem 0; border-top: 2px solid #f0f4e8; margin-top: 1rem; font-size: 1.3rem; }
        .checkout-btn { background: var(--primary); color: white; border: none; padding: 1.3rem; border-radius: 1.2rem; font-weight: 700; cursor: pointer; width: 100%; font-size: 1.1rem; transition: all 0.2s; }
        .checkout-btn:hover { background: var(--primary-light); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}

export default App;
