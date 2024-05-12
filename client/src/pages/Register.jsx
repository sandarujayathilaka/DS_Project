import React, { useState } from 'react';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
        console.log('Form submitted successfully!');
        // Clear the form after submission
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setRole('');
        setAddress('');
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-white">
            <div className="container mx-auto my-4 px-4 lg:px-20">
                <div className="w-full p-8 my-4 md:px-12 lg:w-12/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                    <h1 className="font-bold uppercase text-5xl">Join with Us</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                        <input
                            type="text"
                            placeholder="First Name*"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name*"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone*"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password*"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            required
                        />
                        <div className="relative">
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="" disabled hidden>Select the Role*</option>
                                <option value="learner">Learner</option>
                                <option value="tutor">Tutor</option>
                                <option value="admin">Admin</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 9a1 1 0 100 2h12a1 1 0 100-2H4zM4 13a1 1 0 100 2h7a1 1 0 100-2H4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <textarea
                            placeholder="Address*"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="mt-4">
                        <p>Already registered? <a href="/login" className="text-blue-600">Log In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
