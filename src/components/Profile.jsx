import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';
import ApiService from '../services/apiUserServices'; // Ensure this path is correct

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phone: false,
    mobile: false,
    address: false
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

    const fetchCarsData = async () => {
      try {
        const carsData = await ApiService.getCarsByUserId(userId);
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars data:', error);
      }
    };

    fetchUserData();
    fetchCarsData();
  }, [userId]);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSaveClick = async (field) => {
    try {
      const updatedUser = await ApiService.updateUser(userId, { [field]: editedUser[field] });
      setUser((prev) => ({ ...prev, [field]: editedUser[field] }));
      setEditedUser((prev) => ({ ...prev, [field]: updatedUser[field] }));
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error('Error updating user data:', error);
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
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='/'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-3 mt-3">{user.username}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>become an expert</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                {['username', 'email', 'phone', 'mobile', 'address'].map((field, index) => (
                  <React.Fragment key={index}>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>{field.charAt(0).toUpperCase() + field.slice(1)}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="7">
                        {isEditing[field] ? (
                          <MDBInput 
                            name={field} 
                            value={editedUser[field]} 
                            onChange={handleChange} 
                            size="sm"
                          />
                        ) : (
                          <MDBCardText className="text-muted">
                            {user[field] || `No ${field}`}
                          </MDBCardText>
                        )}
                      </MDBCol>
                      <MDBCol sm="1" className="d-flex align-items-center justify-content-end">
                        {isEditing[field] ? (
                          <MDBBtn size="sm" color="success" onClick={() => handleSaveClick(field)}>
                            <MDBIcon icon="save" />
                          </MDBBtn>
                        ) : (
                          <MDBIcon icon="edit" onClick={() => handleEditClick(field)} />
                        )}
                      </MDBCol>
                    </MDBRow>
                    {index < 4 && <hr />}
                  </React.Fragment>
                ))}
              </MDBCardBody>
            </MDBCard>

            {/* Displaying User's Cars */}
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBCardText className="lead fw-normal mb-3">User's Cars</MDBCardText>
                {cars.length > 0 ? (
                  cars.map((car) => (
                    <MDBCard key={car.id} className="mb-3">
                      <MDBCardBody>
                        <MDBCardText>Car Make: {car.make}</MDBCardText>
                        <MDBCardText>Car Model: {car.model}</MDBCardText>
                        <MDBCardText>Year: {car.year}</MDBCardText>
                        {/* Display car images */}
                        {car.images && car.images.length > 0 && (
                          <div className="mb-3">
                            {car.images.map((image, index) => (
                              <MDBCardImage
                                key={index}
                                src={`http://localhost:8081/api/files/download/${image.filename}`}
                                alt={`Car ${index + 1}`}
                                className="w-100 rounded-3 mb-3"
                              />
                            ))}
                          </div>
                        )}
                        {/* Add more car details as needed */}
                      </MDBCardBody>
                    </MDBCard>
                  ))
                ) : (
                  <MDBCardText>No cars found for this user.</MDBCardText>
                )}
              </MDBCardBody>
            </MDBCard>

            {/* Adding Recent Photos section here */}
            <MDBCard className="mb-4">
              <MDBCardBody className="text-black p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
