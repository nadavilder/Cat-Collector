import React, { useState, useEffect } from 'react';
import CatList from './CatList';

const API_URL = "http://localhost:5000";

function App() {
    const [cats, setCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/fetch-cats`)
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchCats();
            })
            .catch(error => {
                console.error('Error fetching cats:', error);
                setIsLoading(false);
            });
    }, []);

    const fetchCats = () => {
        fetch(`${API_URL}/cats`)
            .then(response => response.json())
            .then(data => {
                setCats(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    };

    const toggleFavorite = (catId) => {
      const cat = cats.find(cat => cat.id === catId);
  
      if (cat.is_favorite) {
          // If the cat is already a favorite, send a DELETE request to remove it from favorites
          fetch(`${API_URL}/cats/${catId}`, {
              method: 'DELETE',
          })
          .then(() => {
              // Optimistically update the UI to reflect the removal from favorites
              const updatedCats = cats.map(cat => cat.id === catId ? { ...cat, is_favorite: false } : cat);
              setCats(updatedCats);
          })
          .catch(error => console.error('Error:', error));
      } else {
          // If the cat is not a favorite, send a POST request to add it to favorites
          fetch(`${API_URL}/cats`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: catId }) // Sending catId in the request body
          })
          .then(() => {
              // Optimistically update the UI to reflect the addition to favorites
              const updatedCats = cats.map(cat => cat.id === catId ? { ...cat, is_favorite: true } : cat);
              setCats(updatedCats);
          })
          .catch(error => console.error('Error:', error));
      }
  };
  
  
  

    const updateCat = (catId, updatedFields) => {
        fetch(`${API_URL}/cats/${catId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFields),
        })
        .then(() => fetchCats())  // Refresh the cat list to reflect the update
        .catch(error => console.error('Error:', error));
    };

    if (isLoading) {
        return <div>Loading data...</div>;
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Cat Collector App</h1>
            <CatList 
                cats={cats} 
                onFavoriteToggle={toggleFavorite}
                onUpdateCat={updateCat}
            />
        </div>
    );
}

export default App;
