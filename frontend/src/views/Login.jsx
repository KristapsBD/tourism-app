import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";


export default function Login(){
    const Auth = useAuth()
    const [formFields, setFormFields] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({
        errorMsg: "",
    });
    const isSubmittable =
        Object.values(formFields).every(field => field !== "") &&
        Object.values(formErrors).every(error => error === "")
    const handleFormChange = (e)=>{
       setFormFields((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setFormErrors((prev)=>({
            ...prev,
            errorMsg: ""
        }))
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await Auth.userLogin(formFields.username, formFields.password);
            setFormFields({
                username: "",
                password: "",
            })

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-amber-500">
            <div className="max-w-lg bg-amber-300 min-w-lg">
                <h1 className="text-center">Login</h1>
                <form onSubmit={handleLogin}>
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
                    <div className="h-6" style={{color: formErrors.errorMsg ? "red" : "transparent"}}>
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