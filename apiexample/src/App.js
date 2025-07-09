import React from 'react';
import { Spinner, Card, Button, Container, Row, Col } from 'react-bootstrap';
import useFeedData from './hooks/useFeedData';  // Import your custom hook
import './App.css';  // Import the custom CSS for additional styling

/**
 * FeedSection component - Fetches and displays feed data from the API
 * @param {Object} props
 * @param {string} props.title - The title of the feed section
 * @param {string} props.apiEndpoint - The API endpoint to fetch data from
 */
const FeedSection = ({ title, apiEndpoint }) => {
  // Using custom hook to fetch data from the API
  const { data, loading, error } = useFeedData(apiEndpoint, 25); // Fetching 25 items

  // While data is loading, show a spinner
  if (loading) {
    return (
      <div className="text-center">
        <h4>{title}</h4>
        <Spinner animation="border" />
      </div>
    );
  }

  // If there is an error, display the error message
  if (error) {
    return (
      <div className="text-center">
        <h4>{title}</h4>
        <div className="text-danger">{`Error: ${error}`}</div>
      </div>
    );
  }

  // If no data is found, display a "No content available" message
  if (!data || data.length === 0) {
    return (
      <div className="text-center">
        <h4>{title}</h4>
        <div>No content available</div>
      </div>
    );
  }

  // Render the list of feed items (showing up to 25 items)
  return (
    <Container>
      <h4 className="feed-section-title mb-4">{title}</h4>
      <Row>
        {data.slice(0, 25).map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="feed-card h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="feed-card-title">{item.title || 'No Title'}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <strong>Bill Number:</strong> {item.bill_number || 'N/A'}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Status:</strong> {item.status_title || 'N/A'}
                  <br />
                  <strong>Chamber:</strong> {item.origin_chamber || 'N/A'}
                  <br />
                  <strong>Committee:</strong> {item.committee || 'N/A'}
                  <br />
                  <strong>Created At:</strong> {item.created_at || 'N/A'}
                </Card.Text>
                <Card.Text>
                  <strong>Description:</strong> {item.description ? item.description.slice(0, 100) + '...' : 'No description available'}
                </Card.Text>
                <Button variant="primary" href={item.url} target="_blank" rel="noopener noreferrer">
                  More Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const App = () => {
  return (
    <div className="p-5">
      <h1 className="text-center mb-4 app-title">API Feed Example</h1>
      {/* Displaying FeedSection with data fetched from API */}
      <FeedSection
        title="Recent Congressional Bills"
        apiEndpoint="https://api.govglance.org/posts/recent?limit=25&schema=united_states_of_america&table=congressional_bills&order_by=action_date&skip=0"  // Full API URL
      />
    </div>
  );
};

export default App;
