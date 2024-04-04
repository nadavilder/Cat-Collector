import React, { useState } from 'react';

function CatCard({ cat, onFavoriteToggle, onUpdateCat }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(cat.name);
    const [editedDescription, setEditedDescription] = useState(cat.description);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedName(cat.name);
        setEditedDescription(cat.description);
    };

    const handleSave = () => {
        if (editedName !== cat.name || editedDescription !== cat.description) {
            onUpdateCat(cat.id, { name: editedName, description: editedDescription });
        }
        setIsEditing(false);
    };

    return (
        <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', width: '220px', margin: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            <img src={cat.image_url} alt={cat.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            {isEditing ? (
                <div style={{ padding: '10px' }}>
                    <input 
                        type="text" 
                        value={editedName} 
                        onChange={e => setEditedName(e.target.value)} 
                        placeholder="Name" 
                        style={{ width: '100%', marginBottom: '8px' }}
                    />
                    <textarea 
                        value={editedDescription} 
                        onChange={e => setEditedDescription(e.target.value)} 
                        placeholder="Description"
                        style={{ width: '100%', height: '80px', marginBottom: '8px' }}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div style={{ padding: '10px' }}>
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span onClick={() => onFavoriteToggle(cat.id)} style={{ cursor: 'pointer' }} title={cat.is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                            {cat.is_favorite ? '❤️' : '🤍'}
                        </span>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CatCard;
