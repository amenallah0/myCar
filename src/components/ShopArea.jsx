import React, { useState, useEffect, useCallback } from "react";
import Slider from "rc-slider";
import { Link } from "react-router-dom";
import ApiCarService from '../services/apiCarServices';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ShopArea = () => {
  const [range, setRange] = useState([0, 100]);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [carMakes, setCarMakes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(600);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState("Choose");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const fetchCars = useCallback(async (query = "") => {
    try {
      const response = await ApiCarService.getAllCars();
      const filtered = response.filter(car => 
        car.make.toLowerCase().includes(query.toLowerCase()) ||
        car.model.toLowerCase().includes(query.toLowerCase())
      );
      setCars(filtered);

      // Extract unique car makes
      const makes = [...new Set(filtered.map(car => car.make))];
      setCarMakes(makes);

      // Get the highest price and update maxPrice state
      const highestPrice = Math.max(...filtered.map(car => car.price));
      setMaxPrice(Math.ceil(highestPrice / 1000) * 1000);
      setRange([0, Math.ceil(highestPrice / 1000) * 1000]);

      filterByPrice(filtered, [0, Math.ceil(highestPrice / 1000) * 1000]);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Error fetching cars');
    }
  }, []);

  useEffect(() => {
    fetchCars(searchQuery);
  }, [searchQuery, fetchCars]);

  useEffect(() => {
    filterByPrice(cars, range);
  }, [range, cars]);

  const filterByPrice = (cars, range) => {
    const [min, max] = range;
    const filtered = cars.filter(car => car.price >= min && car.price <= max);
    setFilteredCars(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    setSearchQuery(query);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    sortCars(value);
  };

  const sortCars = (order) => {
    const sortedCars = [...filteredCars];
    if (order === "date") {
      sortedCars.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (order === "price") {
      sortedCars.sort((a, b) => a.price - b.price);
    } else if (order === "price-desc") {
      sortedCars.sort((a, b) => b.price - a.price);
    }
    setFilteredCars(sortedCars);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIdx = (currentPage - 1) * carsPerPage;
  const endIdx = Math.min(startIdx + carsPerPage, filteredCars.length);
  const displayedCars = filteredCars.slice(startIdx, endIdx);

  const saveCarToFavorites = (car) => {
    const existingFavorites = [...favorites];
    const isAlreadyFavorite = existingFavorites.some(favCar => favCar.id === car.id);

    if (isAlreadyFavorite) {
      const updatedFavorites = existingFavorites.filter(favCar => favCar.id !== car.id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...existingFavorites, car];
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
    }
  };

  const isCarFavorite = (carId) => {
    return favorites.some(favCar => favCar.id === carId);
  };

  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        <div className="row flex-row-reverse align-items-start">
          <div className="col-xl-3 col-lg-4 sidebar-widget-area order-lg-2">
            <aside className="sidebar-sticky-area sidebar-area sidebar-shop">
              <div className="widget widget_search">
                <h3 className="widget_title">Search</h3>
                <form className="search-form" onSubmit={handleSearch}>
                  <input type="text" name="search" placeholder="Find your product" />
                  <button type="submit">
                    <i className="fas fa-search" />
                  </button>
                </form>
              </div>
              <div className="widget widget_categories">
                <h3 className="widget_title">Product categories</h3>
                <ul>
                  {carMakes.map((make, index) => (
                    <li key={index}>
                      <Link to={`/shop-details/${make.toLowerCase()}`}>
                        {make}
                      </Link>
                      <span>({filteredCars.filter(car => car.make === make).length})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="widget widget_price_filter">
                <h4 className="widget_title">Filter By Price</h4>
                <div style={{ width: "220px", margin: "20px" }}>
                  <Slider
                    range
                    min={0}
                    max={maxPrice}
                    value={range}
                    onChange={handleRangeChange}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <span>{range[0]} TND</span>
                    <span>{range[1]} TND</span>
                  </div>
                </div>
                <div className="price_slider_wrapper">
                  <div className="price_slider" />
                  <div className="price_label">
                    Price: <span className="from">{range[0]} TND</span> —{" "}
                    <span className="to">{range[1]} TND</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div className="col-xl-9 col-lg-8 order-lg-1">
            <div className="shop-sort-bar">
              <div className="row justify-content-between align-items-center">
                <div className="col-md">
                  <p className="woocommerce-result-count">
                    Showing {startIdx + 1}-{endIdx} of {filteredCars.length} results
                  </p>
                </div>
                <div className="col-md-auto">
                  <Link to="/AddCar" className="btn btn-primary btn-sm-add-car">Add Car</Link>
                </div>
                <div className="col-md-3">
                  <form className="woocommerce-ordering" method="get">
                    <div className="form-group mb-0">
                      <select
                        name="orderby"
                        className="single-select orderby"
                        aria-label="Shop order"
                        value={sortOrder}
                        onChange={handleSortChange}
                      >
                        <option value="date">Sort by latest</option>
                        <option value="price">Sort by price: low to high</option>
                        <option value="price-desc">Sort by price: high to low</option>
                      </select>
                      <i className="fas fa-angle-down" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row">
              {displayedCars.map((car) => (
                <div className="col-md-4 mb-4" key={car.id}>
                  <div className="card">
                    <img
                      src={`http://localhost:8081/api/files/download/${car.images?.[0]?.filename}`}
                      className="card-img-top"
                      alt={`${car.make} ${car.model}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{car.make} {car.model}</h5>
                      <p className="card-text">Price: {car.price} TND</p>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/shop-details/${car.id}`} className="link-btn">
                          View Details <i className="fas fa-arrow-right" />
                        </Link>
                        <button 
                          onClick={() => saveCarToFavorites(car)} 
                          className="btn btn-favorite"
                          style={{ marginLeft: "10px", border: "none", background: "none" }}
                        >
                          <i className={`fas fa-heart ${isCarFavorite(car.id) ? 'text-danger' : 'text-muted'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination justify-content-center mt-70">
              <ul>
                {[...Array(totalPages).keys()].map(pageNumber => (
                  <li key={pageNumber + 1}>
                    <Link
                      to="#"
                      onClick={() => handlePageChange(pageNumber + 1)}
                      className={pageNumber + 1 === currentPage ? 'active' : ''}
                    >
                      {pageNumber + 1}
                    </Link>
                  </li>
                ))}
                {currentPage < totalPages && (
                  <li>
                    <Link to="#" onClick={() => handlePageChange(currentPage + 1)}>
                      <i className="fas fa-angle-right" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ShopArea;
