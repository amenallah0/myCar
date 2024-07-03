import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import ApiCarService from "./../services/apiCarServices";

function AddCar() {
  const [formData, setFormData] = useState({
    car: {
      make: '',
      model: '',
      color: '',
      year: '',
      powerRating: '',
      numberOfDoors: '',
      fuelTankCapacity: '',
      maximumSpeed: '',
      mileage: '',
      options: '',
      price: '',
    },
    userId: '',
    images: [],
    imagePreviews: [],
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      car: {
        ...prevState.car,
        [name]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setFormData(prevState => ({
      ...prevState,
      images: files,
      imagePreviews: previews
    }));
  };

  const handleUserIdChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      userId: e.target.value
    }));
  };

  const handleDeleteImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      images: newImages,
      imagePreviews: newPreviews
    }));
  
    // Update the file input field to reflect current images
    const files = newImages.map(file => new File([file], file.name));
    const fileList = new DataTransfer();
    files.forEach(file => fileList.items.add(file));
    fileInputRef.current.files = fileList.files;
  
    // Clear the file input field if all images are deleted
    if (newImages.length === 0) {
      fileInputRef.current.value = null;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await ApiCarService.addCarWithImagesToUser(formData.userId, formData.car, formData.images);
        toast.success('Car added successfully!');
        setFormData({
            car: {
                make: '',
                model: '',
                color: '',
                year: '',
                powerRating: '',
                numberOfDoors: '',
                fuelTankCapacity: '',
                maximumSpeed: '',
                mileage: '',
                options: '',
                price: '',
            },
            userId: '',
            images: [],
            imagePreviews: [],
        });
        fileInputRef.current.value = null; // Reset file input field after submission
    } catch (error) {
        toast.error('Error adding car');
        console.error('Error adding car:', error);
    }
};

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4 fw-bold ">Add Car</h2>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="make" className="mb-3">
                          <Form.Label>Make</Form.Label>
                          <Form.Control
                            type="text"
                            name="make"
                            value={formData.car.make}
                            onChange={handleChange}
                            placeholder="Enter car make"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="model" className="mb-3">
                          <Form.Label>Model</Form.Label>
                          <Form.Control
                            type="text"
                            name="model"
                            value={formData.car.model}
                            onChange={handleChange}
                            placeholder="Enter car model"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="color" className="mb-3">
                          <Form.Label>Color</Form.Label>
                          <Form.Control
                            type="text"
                            name="color"
                            value={formData.car.color}
                            onChange={handleChange}
                            placeholder="Enter car color"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="year" className="mb-3">
                          <Form.Label>Year</Form.Label>
                          <Form.Control
                            type="number"
                            name="year"
                            value={formData.car.year}
                            onChange={handleChange}
                            placeholder="Enter car year"
                            min="1886"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="powerRating" className="mb-3">
                          <Form.Label>Power Rating</Form.Label>
                          <Form.Control
                            type="number"
                            name="powerRating"
                            value={formData.car.powerRating}
                            onChange={handleChange}
                            placeholder="Enter power rating"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="numberOfDoors" className="mb-3">
                          <Form.Label>Number of Doors</Form.Label>
                          <Form.Control
                            type="number"
                            name="numberOfDoors"
                            value={formData.car.numberOfDoors}
                            onChange={handleChange}
                            placeholder="Enter number of doors"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="fuelTankCapacity" className="mb-3">
                          <Form.Label>Fuel Tank Capacity</Form.Label>
                          <Form.Control
                            type="number"
                            name="fuelTankCapacity"
                            value={formData.car.fuelTankCapacity}
                            onChange={handleChange}
                            placeholder="Enter fuel tank capacity"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="maximumSpeed" className="mb-3">
                          <Form.Label>Maximum Speed</Form.Label>
                          <Form.Control
                            type="number"
                            name="maximumSpeed"
                            value={formData.car.maximumSpeed}
                            onChange={handleChange}
                            placeholder="Enter maximum speed"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="mileage" className="mb-3">
                          <Form.Label>Mileage</Form.Label>
                          <Form.Control
                            type="number"
                            name="mileage"
                            value={formData.car.mileage}
                            onChange={handleChange}
                            placeholder="Enter mileage"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="options" className="mb-3">
                          <Form.Label>Options</Form.Label>
                          <Form.Control
                            type="text"
                            name="options"
                            value={formData.car.options}
                            onChange={handleChange}
                            placeholder="Enter car options"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="price" className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.car.price}
                        onChange={handleChange}
                        placeholder="Enter car price"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="userId" className="mb-3">
                      <Form.Label>User ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleUserIdChange}
                        placeholder="Enter user ID"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="images" className="mb-3">
                      <Form.Label>Images</Form.Label>
                      <Form.Control
                        type="file"
                        name="images"
                        onChange={handleFileChange}
                        multiple
                        ref={fileInputRef}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mt-4">
                      Submit
                    </Button>
                  </Col>
                  <Col md={4} className="d-flex align-items-center">
                    <div>
                      <h3 className="text-center mb-3">Image Previews</h3>
                      <div
                        className="d-flex flex-wrap justify-content-center"
                        style={{
                          height: '750px', // Height for 3 images (250px each)
                          overflowY: formData.imagePreviews.length > 3 ? 'auto' : 'hidden',
                        }}
                      >
                        {formData.imagePreviews.map((src, index) => (
                          <div key={index} className="position-relative m-2">
                            <img
                              src={src}
                              alt="Preview"
                              className="img-thumbnail"
                              style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              className="position-absolute top-0 end-0 p-1"
                              style={{ fontSize: '0.8rem' }}
                              onClick={() => handleDeleteImage(index)}
                            >
                              X
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default AddCar;
