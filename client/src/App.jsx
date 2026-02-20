import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

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

  // Task 6: Handle Form Submission (Create)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return alert('Please enter name and price');

    const newProduct = { 
      name, 
      price: parseFloat(price), 
      description, 
      stock: Math.floor(Math.random() * 50) + 1 // Simple random stock
    };

    fetch(`${apiUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then(() => {
        setName('');
        setPrice('');
        setDescription('');
        fetchProducts(); // Refresh the list
      })
      .catch((err) => console.error('Error adding product:', err));
  };

  return (
    <div className="container">
      <header>
        <h1>PetKit Now 🐾</h1>
        <p>Premium Supplies for Your Furry Friends</p>
      </header>

      {/* Task 6: Add Product Form */}
      <section className="add-form">
        <form onSubmit={handleSubmit}>
          <h3>List a New Product</h3>
          <div className="form-row">
            <input 
              type="text" 
              placeholder="Product Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="number" 
              placeholder="Price ($)" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
            />
          </div>
          <textarea 
            placeholder="Description (What makes this special?)" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <button type="submit" className="btn-add">Add to Shop</button>
        </form>
      </section>

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
                <span className="stock">{product.stock} in stock</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task 6 extra styles */}
      <style>{`
        .add-form {
          max-width: 600px;
          margin: 0 auto 5rem auto;
          background: #fff;
          padding: 2.5rem;
          border-radius: 1.5rem;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }
        .add-form h3 { margin-bottom: 2rem; color: var(--primary); font-size: 1.5rem; }
        .form-row { display: flex; gap: 1rem; margin-bottom: 1rem; }
        input, textarea {
          width: 100%;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          background: #fafafa;
        }
        textarea { height: 100px; margin-bottom: 1.5rem; }
        .btn-add {
          width: 100%;
          padding: 1.25rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 1rem;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .btn-add:hover { transform: scale(1.02); background: var(--primary-light); }
      `}</style>
    </div>
  );
}

export default App;
