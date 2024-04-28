import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
    const Auth = useAuth();
    const [formFields, setFormFields] = useState({
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
    });
    const [formErrors, setFormErrors] = useState({
        errorMsg: "",
    });

    const isSubmittable =
        Object.values(formFields).every((field) => field !== "") &&
        Object.values(formErrors).every((error) => error === "");

    const handleFormChange = (e) => {
        setFormFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setFormErrors((prev) => ({
            ...prev,
            errorMsg: "",
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Check if passwords match
            if (formFields.password !== formFields.repeatPassword) {
                setFormErrors({
                    errorMsg: "Passwords do not match",
                });
                return;
            }
            //TODO
            // Make user register route
            console.log(formFields)

            // Reset form fields after successful registration
            setFormFields({
                email: "",
                username: "",
                password: "",
                repeatPassword: "",
            });
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-amber-500">
            <div className="max-w-lg bg-amber-300 min-w-lg">
                <h1 className="text-center">Register</h1>
                <form onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleFormChange}
                            value={formFields.email}
                            className="
                mt-1
                px-4
                py-2
                w-full
                border
                rounded-md
                focus:outline-none
              "
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleFormChange}
                            value={formFields.username}
                            className="
                mt-1
                px-4
                py-2
                w-full
                border
                rounded-md
                focus:outline-none
              "
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleFormChange}
                            value={formFields.password}
                            className="
                mt-1
                px-4
                py-2
                w-full
                border
                rounded-md
                focus:outline-none
              "
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                            onChange={handleFormChange}
                            value={formFields.repeatPassword}
                            className="
                mt-1
                px-4
                py-2
                w-full
                border
                rounded-md
                focus:outline-none
              "
                            autoComplete="off"
                        />
                    </div>
                    <div className="h-6" style={{ color: formErrors.errorMsg ? "red" : "transparent" }}>
                        {formErrors.errorMsg || " "}
                    </div>
                    <button
                        type="submit"
                        disabled={!isSubmittable}
                        className={`
              mt-4
              mb-4
              block
              mx-auto
              px-4
              py-2
              rounded-md
              focus:outline-none
              w-2/3"
              bg-amber-900
            `}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
