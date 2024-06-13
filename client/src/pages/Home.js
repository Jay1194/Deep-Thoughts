import React from 'react';
import ThoughtList from '../components/ThoughtList';

// allow us to make requests to the GraphQL server we connected to and made available to the application using the <ApolloProvider> component in App.js earlier.
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

// query with the imported Hook functionality, and we'll be able to query thought data!
const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  //get the thought data out of the query's response
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  return (
    <main>
  <div className="flex-row justify-space-between">
    <div className="col-12 mb-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
      )}
    </div>
  </div>
</main>
  );
};

export default Home;
