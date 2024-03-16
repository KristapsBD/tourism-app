import './App.css';
import React, {useEffect, useState} from 'react';

function App() {
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('test')
            .then(response => response.text())
            .then(data => {
                setInfo(data);
                setLoading(false);
            })
    }, [setLoading]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Tourism app {info}
                </p>
            </header>
        </div>
    );
}

export default App;
