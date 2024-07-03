import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import { Link } from "react-router-dom";
import ApiCarService from '../services/apiCarServices';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ShopArea = () => {
  const [range, setRange] = useState([0, 100]);
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [carMakes, setCarMakes] = useState([]);

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const fetchCars = async (query = "") => {
    try {
      const response = await ApiCarService.getAllCars();
      const filteredCars = response.filter(car => 
        car.make.toLowerCase().includes(query.toLowerCase()) ||
        car.model.toLowerCase().includes(query.toLowerCase())
      );
      setCars(filteredCars);

      // Extract unique car makes
      const makes = [...new Set(filteredCars.map(car => car.make))];
      setCarMakes(makes);

      toast.success('Cars fetched successfully');
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Error fetching cars');
    }
  };

  useEffect(() => {
    fetchCars(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    setSearchQuery(query);
  };

  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        <div className="row flex-row-reverse align-items-center">
          <div className="col-xl-9 col-lg-8">
            <div className="shop-sort-bar">
              <div className="row justify-content-between align-items-center">
                <div className="col-md">
                  <p className="woocommerce-result-count">
                    Showing {cars.length} of {cars.length} results
                  </p>
                </div>
                <div className="col-md-auto">
                  <Link to="/AddCar" className="btn btn-primary btn-sm-add-car">Add Car</Link>
                </div>
                <div className="col-md-auto">
                  <form className="woocommerce-ordering" method="get">
                    <div className="form-group mb-0">
                      <select
                        name="orderby"
                        className="single-select orderby"
                        aria-label="Shop order"
                        defaultValue={"Choose"}
                      >
                        <option value="Choose">Default Sorting</option>
                        <option value="popularity">Sort by popularity</option>
                        <option value="rating">Sort by average rating</option>
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
              {cars.map((car) => (
                <div className="col-md-4 mb-4" key={car.id}>
                  <div className="card">
                    <img
                      src={`http://localhost:8081/api/files/download/${car.images?.[0]?.filename}`}
                      className="card-img-top"
                      alt={`${car.make} ${car.model}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{car.make} {car.model}</h5>
                      <p className="card-text">Price: ${car.price}</p>
                      <Link to={`/shop-details/${car.id}`} className="link-btn">
                        View Details <i className="fas fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination justify-content-center mt-70">
              <ul>
                <li>
                  <Link to="/blog">1</Link>
                </li>
                <li>
                  <Link to="/blog">2</Link>
                </li>
                <li>
                  <Link to="/blog">3</Link>
                </li>
                <li>
                  <Link to="/blog">
                    <i className="fas fa-angle-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 sidebar-widget-area">
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
                      <span>({cars.filter(car => car.make === make).length})</span>
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
                    max={600}
                    defaultValue={[0, 100]}
                    value={range}
                    onChange={handleRangeChange}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  ></div>
                </div>
                <div className="price_slider_wrapper">
                  <div className="price_slider" />
                  <div className="price_label">
                    Price: <span className="from">${range[0]}</span> —{" "}
                    <span className="to">${range[1]}</span>
                    <button type="submit" className="button btn">
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="widget product_ratting_widget">
                <h3 className="widget_title">Sort by Raiting</h3>
                <ul>
                  <li>
                    <span className="star-rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star unavailable" />
                    </span>
                    <span>(12)</span>
                  </li>
                  <li>
                    <span className="star-rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star unavailable" />
                      <i className="fas fa-star unavailable" />
                    </span>
                    <span>(5)</span>
                  </li>
                  <li>
                    <span className="star-rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star unavailable" />
                      <i className="fas fa-star unavailable" />
                      <i className="fas fa-star unavailable" />
                    </span>
                    <span>(1)</span>
                  </li>
                </ul>
              </div>
              <div className="widget product-color">
                <h3 className="widget_title">Sort by Color</h3>
                <ul>
                  <li>
                    <Link to="#">
                      <span className="product-color" style={{ background: "white" }} />
                      White
                    </Link>
                    <span>(12)</span>
                  </li>
                  <li>
                    <Link to="#">
                      <span className="product-color" style={{ background: "red" }} />
                      Red
                    </Link>
                    <span>(5)</span>
                  </li>
                  <li>
                    <Link to="#">
                      <span className="product-color" style={{ background: "black" }} />
                      Black
                    </Link>
                    <span>(8)</span>
                  </li>
                  <li>
                    <Link to="#">
                      <span className="product-color" style={{ background: "grey" }} />
                      Grey
                    </Link>
                    <span>(10)</span>
                  </li>
                  <li>
                    <Link to="#">
                      <span className="product-color" style={{ background: "blue" }} />
                      Blue
                    </Link>
                    <span>(7)</span>
                  </li>
                </ul>
              </div>
              <div className="widget widget_banner_img">
                <Link to="/">
                  <img src="assets/img/product/23.jpg" alt="Brand Logo" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ShopArea;
