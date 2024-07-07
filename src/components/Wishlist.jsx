import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteCars")) || [];
    setFavorites(storedFavorites);
    setWishlistCount(storedFavorites.length); // Update wishlist count on load
  }, []); // Empty dependency array, runs only on mount

  const removeFromFavorites = (carId) => {
    const updatedFavorites = favorites.filter((car) => car.id !== carId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteCars", JSON.stringify(updatedFavorites));
    setWishlistCount(updatedFavorites.length); // Update wishlist count after removal
  };

  return (
    <div className="container py-4 text-center">
      <h2 className="mb-6 mt-4 display-5 fw-bold text-uppercase">Your Wishlist </h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {favorites.map((car) => (
          <div key={car.id} className="col">
            <div className="card h-100">
              <Link to={`/shop-details/${car.id}`}>
                <img
                  src={`http://localhost:8081/api/files/download/${car.images?.[0]?.filename}`}
                  className="card-img-top"
                  alt={`${car.make} ${car.model}`}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/shop-details/${car.id}`}>
                    {`${car.make} ${car.model}`}
                  </Link>
                </h5>
                <p className="card-text">
                  <strong>Price:</strong> {car.price.toFixed(2) } TND
                </p>
                <p className="card-text">
                  <span className="badge bg-success">In stock</span>
                </p>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeFromFavorites(car.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
