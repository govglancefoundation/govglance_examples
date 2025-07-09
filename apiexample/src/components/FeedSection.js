import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import useFeedData from './hooks/useFeedData';  // Import your custom hook

/**
 * FeedSection component - Fetches and displays feed data using the API
 * @param {Object} props
 * @param {string} props.title - The title of the feed section
 * @param {string} props.apiEndpoint - The API endpoint to fetch data from
 * @param {string} [props.viewAllLink] - Optional link to view all content
 */
const FeedSection = ({ title, apiEndpoint, viewAllLink }) => {
  // Using your custom hook to fetch data from the API
  const { data, loading, error } = useFeedData(apiEndpoint, 25); // Limiting to 25 items

  // While data is loading, display a spinner
  if (loading) {
    return (
      <div>
        <h4>{title}</h4>
        <Spinner animation="grow" />
      </div>
    );
  }

  // If there is an error, display the error message
  if (error) {
    return (
      <div>
        <h4>{title}</h4>
        <div>{`Error: ${error}`}</div>
      </div>
    );
  }

  // If no data is found, display a message saying "No content available"
  if (!data || data.length === 0) {
    return (
      <div>
        <h4>{title}</h4>
        <div>No content available</div>
      </div>
    );
  }

  // Render the list of feed items (showing only the first 25 items)
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {data.slice(0, 25).map((item, index) => (
          <li key={index}>
            <h5>{item.title}</h5>
            <p>{item.description ? `${item.description.substring(0, 100)}...` : 'No description'}</p>
            <p>Bill Number: {item.bill_number}</p>
            <p>Category: {item.category}</p>
            <p>Chamber: {item.origin_chamber}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">View More</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedSection;
