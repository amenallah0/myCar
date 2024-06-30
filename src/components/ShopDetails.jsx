import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiCarService from "../services/apiCarServices";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ShopDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await ApiCarService.getCarById(id);
        setCar(response);
        toast.success("Car details fetched successfully");
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Error fetching car details");
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) return <div>Loading...</div>;

  const generateCarDescription = (car) => {
    return `This ${car.make} ${car.model} comes in a stunning ${car.color} color. 
      It was manufactured in the year ${car.year} and features a power rating of ${car.powerRating} HP. 
      With ${car.numberOfDoors} doors, it offers a fuel tank capacity of ${car.fuelTankCapacity} liters and can reach a maximum speed of ${car.maximumSpeed} km/h. 
      The car has ${car.mileage} km on the odometer and is equipped with the following options: ${car.options || "Standard options"}. 
      All of this is available at a price of $${car.price}.`;
  };

  return (
    <section className="product-details space-top">
      <div className="container">
        <div className="row gx-80">
          <div className="col-lg-6">
            <Swiper>
              <SwiperSlide>
                <div className="product-thumb">
                  <div className="img">
                    <img src={car.image} alt={`${car.make} ${car.model}`} />
                  </div>
                  <div className="product-tag">Sale</div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="product-about">
              <p className="price">
                ${car.price} <del>${car.previousPrice}</del>
              </p>
              <h2 className="product-title">
                {car.make} {car.model}
              </h2>
              <p className="car-details">
                Color: {car.color} <br />
                Year: {car.year}
              </p>
              <div className="product-rating">
                <span className="star-rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <i
                      key={index}
                      className={`fas fa-star ${
                        index < car.rating ? "" : "unavailable"
                      }`}
                    />
                  ))}
                </span>
                ({car.reviews} Reviews)
              </div>
              <div className="product-description">
                <p>{car.description}</p>
              </div>
              <div className="mt-3">
                <button className="btn btn-primary">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tab-area">
          <ul className="nav product-tab-style1" id="productTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="description-tab"
                data-bs-toggle="tab"
                href="#description"
                role="tab"
                aria-controls="description"
                aria-selected="false"
              >
                Description
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="info-tab"
                data-bs-toggle="tab"
                href="#add_info"
                role="tab"
                aria-controls="add_info"
                aria-selected="false"
              >
                Additional Information
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="reviews-tab"
                data-bs-toggle="tab"
                href="#reviews"
                role="tab"
                aria-controls="reviews"
                aria-selected="true"
              >
                Reviews (03)
              </a>
            </li>
          </ul>
          <div className="tab-content" id="productTabContent">
            <div
              className="tab-pane fade show active"
              id="description"
              role="tabpanel"
              aria-labelledby="description-tab"
            >
              <p>{generateCarDescription(car)}</p>
            </div>
            <div
              className="tab-pane fade"
              id="add_info"
              role="tabpanel"
              aria-labelledby="add_info"
            >
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Brand</th>
                    <td>{car.make}</td>
                  </tr>
                  <tr>
                    <th scope="row">Model</th>
                    <td>{car.model}</td>
                  </tr>
                  <tr>
                    <th scope="row">Color</th>
                    <td>{car.color}</td>
                  </tr>
                  <tr>
                    <th scope="row">Year</th>
                    <td>{car.year}</td>
                  </tr>
                  <tr>
                    <th scope="row">Power Rating</th>
                    <td>{car.powerRating}</td>
                  </tr>
                  <tr>
                    <th scope="row">Number of Doors</th>
                    <td>{car.numberOfDoors}</td>
                  </tr>
                  <tr>
                    <th scope="row">Fuel Tank Capacity</th>
                    <td>{car.fuelTankCapacity}</td>
                  </tr>
                  <tr>
                    <th scope="row">Maximum Speed</th>
                    <td>{car.maximumSpeed}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mileage</th>
                    <td>{car.mileage}</td>
                  </tr>
                  <tr>
                    <th scope="row">Options</th>
                    <td>{car.options}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="tab-pane fade"
              id="reviews"
              role="tabpanel"
              aria-labelledby="reviews-tab"
            >
              {/* Reviews content */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ShopDetails;
