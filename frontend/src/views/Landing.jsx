import {useNavigate} from "react-router-dom";

export default function Landing(){
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src='/logo.jpg' alt="Logo" className="mb-8" style={{ maxWidth: '200px' }} />
            <div className="flex flex-col gap-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/login')}>Login</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/register')}>Register</button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/login')}>Continue without an account</button>
            </div>
        </div>
    );
}