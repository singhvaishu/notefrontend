import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [token, setToken] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // Load token from localStorage when the component mounts
    useEffect(() => {
        setIsClient(true);
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        setToken(storedToken);  // Update token state based on stored token
        // Empty dependency array ensures this runs once after initial render
        setUser(storedUser ? JSON.parse(storedUser) : null);
    }, []);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const handleLogout = () => {
        if (typeof window !== "undefined") {

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        window.location.href = "/login";
    };
    if (!isClient) return null;
    return (
        <header className="w-full bg-gray-500 sticky top-0 z-10">
            <nav className="container mx-auto px-4 h-20 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-red-300 text-lg font-bold">MYTODOS</h1>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-x-6 text-white">
                    <li>
                        <a href="/" className="hover:text-red-300">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="/" className="hover:text-red-300">
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="/" className="hover:text-red-300">
                            Contacts
                        </a>
                    </li>
                </ul>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="h-12 w-12 rounded-full bg-red-300 flex items-center justify-center"
                    >
                        <FaUserCircle className="text-lg" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
                            <ul className="py-2">
                                {!token ? (
                                    <>
                                        <li className="px-4 py-2 hover:bg-gray-200">
                                            <a href="/login">Login</a>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-200">
                                            <a href="/signup">Signup</a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="px-4 py-2 hover:bg-gray-200">
                                            <a href="/dashboard">Dashboard</a>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-200">
                                            <button onClick={handleLogout}>Logout</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden bg-gray-500 text-white px-4">
                <ul className="flex flex-col gap-y-2 py-4">
                    <li>
                        <a href="/">About Us</a>
                    </li>
                    <li>
                        <a href="/">Services</a>
                    </li>
                    <li>
                        <a href="/">Contacts</a>
                    </li>
                    {!token ? (
                        <>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/signup">Signup</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <a href="/dashboard">Dashboard</a>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
