import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Form,
} from 'react-bootstrap';
import ApiService from '../services/apiUserServices';
import ApiCarService from '../services/apiCarServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phone: false,
    mobile: false,
    address: false,
  });
  const [editedUser, setEditedUser] = useState({});
  const userId = 1; // Replace with the method you use to get the user's ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await ApiService.getUserById(userId);
        setUser(userData);
        setEditedUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const fetchCarDetails = async (carId) => {
    try {
      const response = await ApiCarService.getCarById(carId);
      setSelectedCar(response);
      toast.success('Car details fetched successfully');
    } catch (error) {
      console.error('Error fetching car details:', error);
      toast.error('Error fetching car details');
    }
  };

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSaveClick = async (field) => {
    try {
      const updatedUser = await ApiService.updateUser(userId, {
        [field]: editedUser[field],
      });
      setUser((prev) => ({ ...prev, [field]: editedUser[field] }));
      setEditedUser((prev) => ({ ...prev, [field]: updatedUser[field] }));
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      // Make API call to delete the car
      await ApiCarService.deleteCar(carId);
      // Update user state after deletion
      const updatedUser = {
        ...user,
        cars: user.cars.filter((car) => car.id !== carId),
      };
      setUser(updatedUser);
      toast.success('Car deleted successfully');
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Error deleting car');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container className="py-5">
        <Row>
          <Col>
            <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
              <Breadcrumb.Item>
                <a href="/">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>User Profile</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <Card.Body className="text-center">
                <Card.Img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-3 mt-3">{user.username}</p>
                <div className="d-flex justify-content-center mb-2">
                  <Button variant="primary">become an expert</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="8">
            <Card className="mb-4">
              <Card.Body>
                {['username', 'email', 'phone', 'mobile', 'address'].map(
                  (field, index) => (
                    <React.Fragment key={index}>
                      <Row className="mb-3">
                        <Form.Label column sm="3">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Form.Label>
                        <Col sm="7">
                          {isEditing[field] ? (
                            <Form.Control
                              name={field}
                              value={editedUser[field]}
                              onChange={handleChange}
                              size="sm"
                            />
                          ) : (
                            <Form.Label className="text-muted">
                              {user[field] || `No ${field}`}
                            </Form.Label>
                          )}
                        </Col>
                        <Col
                          sm="2"
                          className="d-flex align-items-center justify-content-end"
                        >
                          {isEditing[field] ? (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleSaveClick(field)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleEditClick(field)}
                            >
                              Edit
                            </Button>
                          )}
                        </Col>
                      </Row>
                      {index < 4 && <hr />}
                    </React.Fragment>
                  )
                )}
              </Card.Body>
            </Card>

            {/* Displaying User's Cars */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="lead fw-normal mb-3">{user.username}'s Cars</Card.Title>
                {user.cars.length > 0 ? (
                  user.cars.map((car) => (
                    <Card key={car.id} className="mb-3">
                      <Card.Body>
                        <Card.Text>Car Model: {car.model}</Card.Text>
                        <Card.Text>Car Make: {car.make}</Card.Text>
                        {car.images && car.images.length > 0 && car.images[0].filename ? (
                          <Card.Img
                            src={`http://localhost:8081/api/files/download/${car.images[0].filename}`}
                            alt={car.model}
                            className="img-fluid mb-2"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                          />
                        ) : (
                          <Card.Text>No Image Available</Card.Text>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          className="me-2"
                          onClick={() => fetchCarDetails(car.id)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteCar(car.id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <Card.Text>No cars found.</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
}
