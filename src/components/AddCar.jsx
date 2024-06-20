import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddCar() {
    const [car, setCar] = useState({
        make: "",
        model: "",
        color: "",
        year: "",
        powerRating: "",
        numberOfDoors: "",
        fuelTankCapacity: "",
        maximumSpeed: "",
        mileage: "",
        options: "",
        price: "",
        images: [] // tableau pour stocker les images
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setCar({ ...car, images: files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)
        console.log(car);
        // Ajouter le code pour enregistrer la voiture
        // Puis vider les champs
        setCar({
            make: "",
            model: "",
            color: "",
            year: "",
            powerRating: "",
            numberOfDoors: "",
            fuelTankCapacity: "",
            maximumSpeed: "",
            mileage: "",
            options: "",
            price: "",
            images: []
        });
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
                {/* Champ pour les images */}
                <Form.Group controlId="images">
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </Form.Group>
                {/* Ajouter les autres champs ici */}
                <div className="text-center py-3">
                    <Button variant="primary" type="submit">
                        Save changes
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddCar;
