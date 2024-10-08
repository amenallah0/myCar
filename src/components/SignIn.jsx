import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from '../services/apiUserServices';
import { GoogleLogin } from 'react-google-login';
import { useUser } from '../userContext';

function SignIn() {
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await ApiService.signInUser(email, password);
            console.log('Sign in successful:', response);
            toast.success('Sign in successful!');
            setEmail('');
            setPassword('');
            setUser(response); 
            localStorage.setItem('user', JSON.stringify(response)); // Store user data in local storage
            navigate('/');
        } catch (error) {
            console.error('Error signing in:', error);
            toast.error('Failed to sign in. Please check your credentials and try again.');
        }
    };

    const responseGoogle = async (response) => {
        try {
            const { email } = response.profileObj;
            await ApiService.signInUser(email, ''); // No password for Google login
            toast.success('Sign in successful!');
            setEmail('');
            setPassword('');
            setUser(response);
            localStorage.setItem('user', JSON.stringify(response)); // Store user data in local storage
            navigate('/');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };
    
    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm rounded">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Sign In</h2>
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
                            <div className="form-group text-center">
                                <GoogleLogin
                                    clientId="YOUR_GOOGLE_CLIENT_ID"
                                    buttonText="Sign In with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignIn;
