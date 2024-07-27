import React, { useEffect, useState } from "react";
import ApiCarService from "../services/apiCarServices"; // Adjust the import path as needed
import { Link } from "react-router-dom";

const HeroSix = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCars = async () => {
      try {
        const response = await ApiCarService.getLatestCars();
        setCars(response);
      } catch (error) {
        console.error("Error fetching latest cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCars();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="hero-wrapper" id="hero">
      <div className="container">
        <div className="hero-6" style={{ backgroundColor: "#EAE1D6" }}>
          <div className="row flex-row-reverse align-items-center">
            <div className="col-md-6">
              <div className="hero-thumb text-center">
                <img src="assets/img/update-img/homepage.jpeg" alt="MyCar" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="hero-style6">
                <span className="sub-title">Featured Product</span>
                <h1 className="hero-title">Engine pistons</h1>
                <div className="btn-group">
                  <Link to="/shop" className="btn style2 style-radius">
                    Shop Now
                  </Link>
                  <span className="offer-tag">Up to 20% Off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row gx-3 gy-4">
            {cars.length > 0 ? (
              cars.map((car) => (
                <div key={car.id} className="col-lg-4 col-md-6">
                  <div className="card shadow-sm border-light rounded">
                    <img
                      src={`http://localhost:8081/api/files/download/${car.images[0]?.filename}`}
                      alt={`${car.make} ${car.model}`}
                      className="card-img-top img-fluid" // Ensure image is responsive and fills the container
                      style={{ height: '300px', objectFit: 'cover' }} // Fixed height for uniform size
                    />
                    <div className="card-body text-center">
                      <h4 className="card-title mb-3">
                        <Link to={`/shop-details/${car.id}`} className="text-dark">
                          {car.make} {car.model}
                        </Link>
                      </h4>
                      <Link to={`/shop-details/${car.id}`} className="btn btn-primary-custom btn-lg w-50">
                        Shop Now
                        <i className="fas fa-arrow-right ms-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="lead">No cars available at the moment. Please check back later!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSix;
