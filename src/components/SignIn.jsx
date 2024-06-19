import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import ApiService from '../services/apiUserServices';
import { useUser } from '../userContext';

function SignIn() {
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await ApiService.signInUser(email, password);
            console.log('Sign in successful:', response);
            alert('Sign in successful!');
            setEmail('');
            setPassword('');
            setUser(response); 
            localStorage.setItem('user', JSON.stringify(response)); // Store user data in local storage
            navigate('/');
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Failed to sign in. Please check your credentials and try again.');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm rounded">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Sign In</h2>
                            {error && <p className="text-danger text-center">{error}</p>}
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary">Sign In</button>
                                </div>
                            </form>
                            <div className="form-group text-center">
                                <p>Don't have an account? <Link to="/SignUp"><button className="btn btn-link" style={{color: 'red', background: 'none', border: 'none', outline: 'none', cursor: 'pointer'}}>Sign Up</button></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
