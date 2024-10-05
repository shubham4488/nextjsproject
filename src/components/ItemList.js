// src/components/ItemList.js
"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10');
      setItems(response.data);
    };
    fetchData();
  }, []);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <input 
        type="text" 
        placeholder="Search by title..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }} 
      />
      <div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Responsive grid
        gap: '20px'
      }}>
        {filteredItems.map(item => (
          <div key={item.id} style={{ 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            overflow: 'hidden', 
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            backgroundColor: '#fff'
          }}>
            <Link href={`/item/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img 
                src={item.thumbnailUrl} 
                alt={item.title} 
                style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
              />
              <h3 style={{ padding: '10px', fontSize: '16px', margin: 0 }}>{item.title}</h3>
              <p style={{ padding: '10px', margin: 0, color: '#555' }}>{item.title}</p> {/* Description field replaced */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
