import { react, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import image from "../assets/signup.jpg"; // Import your image file

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userNotFound, setUserNotFound] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await fetch("https://notebackend-y5w9.vercel.app/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);

                // Navigate to the dashboard on successful login
                navigate("/dashboard");
            } else {
                setUserNotFound(data.message === "User not found");
                setErrorMessage(data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>

            <section className="login-container">
                <div className="container px-6 py-12 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full gap-6 text-gray-800">
                        {/* Left side: Image */}
                        <div className="hidden md:block md:w-1/3 lg:w-1/2">
                            <div
                                className="w-full h-full bg-cover bg-center rounded-lg shadow-lg"
                                style={{
                                    backgroundImage: `url(${image})`,
                                    height: "80vh",
                                }}
                            />
                        </div>

                        {/* Right Side: Login Form */}
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                            <main className="max-w-md mx-auto p-4 mt-8">
                                <h1 className="text-3xl font-bold mb-6">Login</h1>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full p-3 border rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full p-3 border rounded-lg"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-gray-700 text-white p-3 rounded-lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Logging in..." : "Login"}
                                    </button>
                                </form>

                                {errorMessage && (
                                    <p className="text-center text-sm text-red-500 mt-4">
                                        {errorMessage}
                                    </p>
                                )}

                                {userNotFound && (
                                    <p className="text-center text-sm text-red-500 mt-4">
                                        User not found.{" "}
                                        <span
                                            onClick={() => navigate("/signup")} // Navigate to the signup page
                                            className="text-gray-700 cursor-pointer underline"
                                        >
                                            Sign up here.
                                        </span>
                                    </p>
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
