import React, { useEffect, useState } from 'react';
import { useUser } from '../userContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ApiService from '../services/apiUserServices';

function Profile() {
    const { username } = useParams();
    const { user } = useUser();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await ApiService.getUserByUsername(username);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm rounded">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Profile</h2>
                            {userData ? (
                                <>
                                    <p><strong>Username:</strong> {userData.username}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    <p><strong>ID:</strong> {userData.id}</p>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                            {user && user.username === username && (
                                <div className="text-center">
                                    <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
