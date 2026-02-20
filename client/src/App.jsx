import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Task 5: Fetch Products from API
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
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
  }, []);

  return (
    <div className="container">
      <header>
        <h1>PetKit Now 🐾</h1>
        <p>Premium Supplies for Your Furry Friends</p>
      </header>

      {/* Task 5: Product Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', opacity: 0.5 }}>Loading premium supplies...</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center', opacity: 0.5 }}>No products found. Start by adding one!</p>
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
    </div>
  );
}

export default App;
