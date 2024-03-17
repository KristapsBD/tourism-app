import { useState, useEffect } from 'react'

import './App.css'

function App() {
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/test')
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
  )
}

export default App
