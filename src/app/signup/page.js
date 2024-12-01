"use client";

import React from "react";
import { useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (

        // <div className="flex flex-col items-center h-screen bg-white">
        <div className="main-container">
            {/* 背景画像セクション */}
            <div
                className="w-full h-80 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/Welcome.png')" }}
            >
            </div>

            {/* フォームセクション */}
            <div className="white-container">
                <h1 className="text-2xl font-bold text-orange-500 text-center mb-4">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Name"
                        value={formData.username}
                        onChange={handleChange}
                        className="input-orange-ring"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-orange-ring"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-orange-ring"
                    />
                    <button
                        type="submit"
                        className="orange-btn font-bold transition duration-200"
                    >
                        <a href = "/top-menu" className="block w-full h-full">
                            Join
                        </a>
                    </button>
                </form>
            </div>
        </div>
    );
}


{/* <button
type="submit"
className="py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition duration-200"
> */}