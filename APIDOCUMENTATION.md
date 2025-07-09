
# API Documentation - Recent Posts from Gov Glance API

This README provides details on how to query recent posts from the **Gov Glance API**, specifically for the **Congressional Bills** table within the **United States of America** schema.

## Endpoint

### URL:
```
GET https://api.govglance.org/posts/recent
```

### Query Parameters:

1. **`limit`** *(integer)*: 
   - Specifies the number of records to return.
   - Example: `limit=5` returns 5 records.
   - Default: 20 if not provided.

2. **`skip`** *(integer)*:
   - Skips the specified number of records for pagination.
   - Example: `skip=1` skips the first record.
   - Default: 0 (no records are skipped).

3. **`schema`** *(string)*:
   - Specifies the schema of the data to fetch.
   - Example: `schema=united_states_of_america`.

4. **`table`** *(string)*:
   - Specifies the table to query.
   - Example: `table=congressional_bills`.

5. **`order_by`** *(string)*:
   - Specifies the column by which to order the results.
   - Example: `order_by=action_date`.

6. **`filter_column`** *(string)*:
   - Filters results by the specified column.
   - Example: `filter_column=bill_number`.

7. **`filter_string`** *(string)*:
   - Filters results by the specified value in the `filter_column`.
   - Example: `filter_string=13`.

### Example API Call Without Filters:
```plaintext
https://api.govglance.org/posts/recent?limit=5&skip=1&schema=united_states_of_america&table=congressional_bills&order_by=action_date
```
- **Parameters**:
  - `limit=5`: Limits the results to 5 records.
  - `skip=1`: Skips the first record.
  - `schema=united_states_of_america`: Queries data from the U.S. schema.
  - `table=congressional_bills`: Fetches data from the "congressional_bills" table.
  - `order_by=action_date`: Orders the records by the action date of the bill.

### Example API Call With Filters:
```plaintext
https://api.govglance.org/posts/recent?limit=10&skip=0&schema=united_states_of_america&table=congressional_bills&order_by=action_date&filter_column=bill_number&filter_string=13
```
- **Parameters**:
  - `limit=10`: Limits the results to 10 records.
  - `skip=0`: Does not skip any records (starts from the first record).
  - `schema=united_states_of_america`: Queries data from the U.S. schema.
  - `table=congressional_bills`: Fetches data from the "congressional_bills" table.
  - `order_by=action_date`: Orders the records by the action date of the bill.
  - `filter_column=bill_number`: Filters the results based on the "bill_number" column.
  - `filter_string=13`: Only includes records where the `bill_number` equals "13".

## Example Response Data Format

The response data is returned as a JSON object with the following structure:

```json
{
  "data": [
    {
      "id": 1,
      "bill_number": "13",
      "title": "Example Bill Title",
      "action_date": "2025-07-09",
      "summary": "A brief summary of the bill.",
      "status": "Passed"
    },
    {
      "id": 2,
      "bill_number": "14",
      "title": "Another Bill Title",
      "action_date": "2025-06-25",
      "summary": "Another brief summary.",
      "status": "Pending"
    }
  ],
  "total": 100,
  "limit": 10,
  "skip": 0
}
```

### Fields:

- **`id`**: Unique identifier for each bill.
- **`bill_number`**: The unique number assigned to each bill.
- **`title`**: The title of the bill.
- **`action_date`**: The date when the bill took action.
- **`summary`**: A brief summary of the bill's contents.
- **`status`**: The current status of the bill (e.g., "Passed", "Pending").

## How API Parameters Affect the Data

### 1. **`limit`**:
   - Determines the number of results returned.
   - Example: Setting `limit=5` will return the first 5 records.

### 2. **`skip`**:
   - Skips a specified number of records for pagination.
   - Example: Setting `skip=1` skips the first record, effectively starting from the second.

### 3. **`filter_column` & `filter_string`**:
   - These parameters allow filtering the data based on a column and value.
   - Example: Setting `filter_column=bill_number&filter_string=13` will return only records where the `bill_number` is "13".

### 4. **`order_by`**:
   - Specifies the column by which to order the data.
   - Example: Setting `order_by=action_date` orders the records by their `action_date`.

## Conclusion

This API provides a flexible way to retrieve, filter, and paginate through data for U.S. Congressional Bills. By adjusting the `limit`, `skip`, `filter_column`, `filter_string`, and `order_by` parameters, you can tailor the API response to your needs.
