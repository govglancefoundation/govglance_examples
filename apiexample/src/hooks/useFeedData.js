import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch feed data from API with improved handling
 * 
 * @param {string} apiEndpoint - Full API endpoint (including all parameters)
 * @param {number} limit - Maximum number of items to fetch, defaults to 1
 * @returns {Object} - Object containing data, loading state, and error
 */
const useFeedData = (apiEndpoint, limit = 1) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the full API URL directly as provided
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY', // Replace with your real API key
          }
        });

        // Check if the response is valid
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response data
        const result = await response.json();

        // Update state with the fetched data
        setData(result);
      } catch (err) {
        // If there’s an error, set the error state
        setError(err.message);
      } finally {
        // Set loading to false when the fetch completes (success or failure)
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, limit]); // Re-run when apiEndpoint or limit changes

  return { data, loading, error };
};

export default useFeedData;
