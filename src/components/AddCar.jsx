import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button } from "react-bootstrap";
import ApiCarService from "./../services/apiCarServices";

function AddCar() {
  const [car, setCar] = useState({
    make: '',
    model: '',
    color: '',
    year: 0,
    powerRating: 0,
    numberOfDoors: 0,
    fuelTankCapacity: 0,
    maximumSpeed: 0,
    mileage: 0,
    options: '',
    price: 0,
  });
  const [userId, setUserId] = useState('');
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ApiCarService.addCarWithImagesToUser(userId, car, images);
      toast.success('Car added successfully!');
      setCar({
        make: '',
        model: '',
        color: '',
        year: 0,
        powerRating: 0,
        numberOfDoors: 0,
        fuelTankCapacity: 0,
        maximumSpeed: 0,
        mileage: 0,
        options: '',
        price: 0,
      });
      setUserId('');
      setImages([]);
    } catch (error) {
      toast.error('Error adding car');
      console.error('Error adding car:', error);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center">Add Car</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="make">
          <Form.Label>Make</Form.Label>
          <Form.Control
            type="text"
            name="make"
            value={car.make}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="model">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            name="model"
            value={car.model}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="color">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={car.color}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={car.year}
            onChange={handleChange}
            min="1886"
            required
          />
        </Form.Group>
        <Form.Group controlId="powerRating">
          <Form.Label>Power Rating</Form.Label>
          <Form.Control
            type="number"
            name="powerRating"
            value={car.powerRating}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="numberOfDoors">
          <Form.Label>Number of Doors</Form.Label>
          <Form.Control
            type="number"
            name="numberOfDoors"
            value={car.numberOfDoors}
            onChange={handleChange}
            min="1"
            required
          />
        </Form.Group>
        <Form.Group controlId="fuelTankCapacity">
          <Form.Label>Fuel Tank Capacity</Form.Label>
          <Form.Control
            type="number"
            name="fuelTankCapacity"
            value={car.fuelTankCapacity}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="maximumSpeed">
          <Form.Label>Maximum Speed</Form.Label>
          <Form.Control
            type="number"
            name="maximumSpeed"
            value={car.maximumSpeed}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="mileage">
          <Form.Label>Mileage</Form.Label>
          <Form.Control
            type="number"
            name="mileage"
            value={car.mileage}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="options">
          <Form.Label>Options</Form.Label>
          <Form.Control
            type="text"
            name="options"
            value={car.options}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={car.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="userId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            name="userId"
            value={userId}
            onChange={handleUserIdChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Car
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default AddCar;
