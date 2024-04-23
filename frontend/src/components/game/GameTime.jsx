import React, { useState } from "react";

export default function GameTime() {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform necessary action to submit game time
        console.log("Submitted game time:");
        console.log("Start Time:", startTime);
        console.log("End Time:", endTime);
        // Reset form fields
        setStartTime("");
        setEndTime("");
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl mb-4 text-center">Define Game Time</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Start Time</label>
                        <input
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">End Time</label>
                        <input
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none"
                    >
                        Define Game Time
                    </button>
                </form>
            </div>
        </div>
    );
}
