
# API Feed Example

This is a simple React app that demonstrates how to use the provided API to fetch and display feed data, specifically Congressional Bills, in a styled, user-friendly interface. The data is fetched using a custom hook (`useFeedData`), and displayed with Bootstrap components for a clean, responsive UI.

## Features

- Fetches and displays a list of recent Congressional bills from the API.
- Displays 25 items per section by default.
- Uses Bootstrap cards to present each bill's information.
- Provides a "More Details" button that redirects to the detailed bill page.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **React Bootstrap**: A library that provides Bootstrap components as React components.
- **Custom Hooks**: A React hook (`useFeedData`) to handle API calls and data fetching.
- **CSS**: Custom CSS for styling the app.

## Installation

### 1. Clone the repository

Clone this repository to your local machine.

```bash
git clone https://github.com/your-username/api-feed-example.git
```

### 2. Navigate to the project directory

```bash
cd api-feed-example
```

### 3. Install dependencies

Install the necessary dependencies for the app.

```bash
npm install
```

### 4. Run the development server

Start the app in development mode.

```bash
npm start
```

The app will be available at `http://localhost:3000` in your browser.

## Folder Structure

```
api-feed-example/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js                # Main application component
│   ├── hooks/
│   │   └── useFeedData.js     # Custom hook for fetching API data
│   ├── components/
│   │   └── FeedSection.js     # Component for displaying feed data
│   ├── App.css                # Custom CSS file
│   └── index.js               # Entry point for the React app
├── package.json               # Project metadata and dependencies
└── README.md                  # Project documentation
```

## Usage

### App Component

The `App.js` file is the main entry point of the app. It displays the `FeedSection` component, which fetches and renders the feed data from the provided API URL.

```jsx
import React from 'react';
import FeedSection from './components/FeedSection';

const App = () => {
  return (
    <div className="p-5">
      <h1 className="text-center mb-4 app-title">API Feed Example</h1>
      {/* FeedSection component that fetches data from the API */}
      <FeedSection
        title="Recent Congressional Bills"
        apiEndpoint="https://api.govglance.org/posts/recent?limit=25&schema=united_states_of_america&table=congressional_bills&order_by=action_date&skip=0"  // Full API URL
      />
    </div>
  );
};

export default App;
```

### FeedSection Component

The `FeedSection` component is responsible for fetching data using the custom hook and rendering the feed content.

- **Props:**
  - `title`: The title of the feed section (e.g., "Recent Congressional Bills").
  - `apiEndpoint`: The full API endpoint URL to fetch data from (passed directly in the component).

- **Data Display:**
  - The component uses the `useFeedData` hook to fetch the latest 25 items.
  - Each item is rendered inside a Bootstrap card.
  - The bill's title, status, bill number, chamber, committee, and description are displayed.
  - A "More Details" button is provided to view additional information on the bill's official page.

```jsx
import { Spinner, Card, Button, Container, Row, Col } from 'react-bootstrap';
import useFeedData from './hooks/useFeedData';  // Import custom hook
import './App.css';  // Import custom styles

const FeedSection = ({ title, apiEndpoint }) => {
  const { data, loading, error } = useFeedData(apiEndpoint, 25); // Fetch 25 items

  // Loading state
  if (loading) {
    return (
      <div className="text-center">
        <h4>{title}</h4>
        <Spinner animation="border" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center">
        <h4>{title}</h4>
        <div className="text-danger">{`Error: ${error}`}</div>
      </div>
    );
  }

  // No data available state
  if (!data || data.length === 0) {
    return (
      <div className="text-center">
        <h4>{title}</h4>
        <div>No content available</div>
      </div>
    );
  }

  // Data rendering
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

export default FeedSection;
```

### useFeedData Hook

The `useFeedData` hook is responsible for fetching data from the API.

```jsx
import { useState, useEffect } from 'react';

const useFeedData = (apiEndpoint, limit = 25) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { data, loading, error };
};

export default useFeedData;
```

### Custom CSS (`App.css`)

Custom CSS to style the cards and buttons for better UX.

```css
/* Basic styles for the app */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.app-title {
  font-size: 2.5rem;
  color: #343a40;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}

.feed-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feed-card-title {
  font-size: 1.25rem;
  color: #007bff;
}

.feed-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

button {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
}

button:hover {
  background-color: #0056b3;
}

.spinner-border {
  margin-top: 50px;
}

@media (max-width: 768px) {
  .feed-card {
    margin: 10px;
  }
}
```

---

## Conclusion

This project fetches and displays recent Congressional bills in a styled layout. It includes data fetching, error handling, and a responsive interface to accommodate various screen sizes. This `README.md` provides the necessary instructions for developers to set up the app, view the source code, and understand how the components are structured.

