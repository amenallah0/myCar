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
    <div className="space-top space-extra-bottom">
      <div className="container">
        <div className="tinv-wishlist woocommerce tinv-wishlist-clear">
          <h2>Your Wishlist ({wishlistCount})</h2> {/* Display wishlist count */}
          <form action="#" method="post" autoComplete="off">
            <table className="tinvwl-table-manage-list">
              <thead>
                <tr>
                  <th className="product-remove" />
                  <th className="product-thumbnail">&nbsp;</th>
                  <th className="product-name">
                    <span className="tinvwl-full">Product Name</span>
                    <span className="tinvwl-mobile">Product</span>
                  </th>
                  <th className="product-price">Unit Price</th>
                  <th className="product-stock">Stock Status</th>
                  <th className="product-action">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((car) => (
                  <tr className="wishlist_item" key={car.id}>
                    <td className="product-remove">
                      <button
                        type="button"
                        onClick={() => removeFromFavorites(car.id)}
                        title="Remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </td>
                    <td className="product-thumbnail">
                      <Link to={`/shop-details/${car.id}`}>
                        <img
                          src={`http://localhost:8081/api/files/download/${car.images?.[0]?.filename}`}
                          className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                          alt={`${car.make} ${car.model}`}
                        />
                      </Link>
                    </td>
                    <td className="product-name">
                      <Link to={`/shop-details/${car.id}`}>
                        {`${car.make} ${car.model}`}
                      </Link>
                    </td>
                    <td className="product-price">
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          <span className="woocommerce-Price-currencySymbol">$</span>
                          {car.price.toFixed(2)}
                        </bdi>
                      </span>
                    </td>
                    <td className="product-stock">
                      <p className="stock in-stock">
                        <span>
                          <span className="tinvwl-txt">In stock</span>
                        </span>
                      </p>
                    </td>
                    <td className="product-action">
                      <button
                        className="button btn style2"
                        name="tinvwl-add-to-cart"
                        title="Add to Cart"
                        disabled // or remove this button if not needed
                      >
                        <span className="tinvwl-txt">Add to Cart</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
