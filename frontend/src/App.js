import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const fetchProductsData = async () => {
    try {
      const response = await axios.get('/api/products');
      console.log(response)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProductsData()
  }, [])

  return (
    <div>
      E-commerce App
    </div>
  )
}

export default App;
