"use client"; // Mark this component as a Client Component

import { usePathname } from 'next/navigation'; // Use next/navigation for routing
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemDetail = () => {
  const pathname = usePathname(); // Get the current pathname
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract the ID from the pathname
  const id = pathname.split('/').pop(); // Get the last part of the URL

  useEffect(() => {
    const fetchItem = async () => {
      if (!id || id === 'item') return; // Check if ID is available and is not the root

      setLoading(true); // Start loading state
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
        setItem(response.data);
      } catch (error) {
        setError('Error fetching the item');
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!item) return <div style={{ textAlign: 'center' }}>No item found.</div>;

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      background: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{ fontSize: '24px', margin: '10px 0', textAlign: 'center' }}>{item.title}</h1>
      <img 
        src={item.thumbnailUrl} // Use thumbnail for smaller image
        alt={item.title} 
        style={{ width: '150px', height: '150px', objectFit: 'cover', display: 'block', margin: '0 auto' }} // Center the image
      />
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#333', lineHeight: '1.6' }}>
        {item.title} {/* Description */}
      </p>
      <h3 style={{ fontSize: '20px', marginTop: '20px' }}>About This Item:</h3>
      <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.5' }}>
        This item is a beautiful representation of art and creativity. 
        It showcases the intricate details and vibrant colors that capture the essence of modern design.
        This unique piece is perfect for any collection, offering both aesthetic pleasure and a glimpse into contemporary artistic expression.
      </p>
      <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.5' }}>
        Whether you are a seasoned collector or new to the art world, this item will surely enhance your space and inspire conversations.
      </p>
      <div style={{
        marginTop: '20px',
        padding: '10px',
        background: '#e7f3fe',
        borderRadius: '5px',
        border: '1px solid #a5c7ee',
        textAlign: 'center',
        fontSize: '16px',
      }}>
        <strong>Price:</strong> $19.99
      </div>
    </div>
  );
};

export default ItemDetail;
