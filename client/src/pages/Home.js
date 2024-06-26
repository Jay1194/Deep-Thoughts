import React from 'react';
import ThoughtList from '../components/ThoughtList';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';

// allow us to make requests to the GraphQL server we connected to and made available to the application using the <ApolloProvider> component in App.js earlier.
import { useQuery } from '@apollo/client';

// query with the imported Hook functionality, and we'll be able to query thought data!
const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  //get the thought data out of the query's response
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  const loggedIn = Auth.loggedIn();

  return (
    <main>
  <div className="flex-row justify-space-between">
    {loggedIn && (
      <div className="col-12 mb-3">
        <ThoughtForm />
      </div>
    )}
    <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
  {loading ? (
    <div>Loading...</div>
  ) : (
    <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
  )}
</div>
{loggedIn && userData ? (
  <div className="col-12 col-lg-3 mb-3">
    <FriendList
      username={userData.me.username}
      friendCount={userData.me.friendCount}
      friends={userData.me.friends}
    />
  </div>
) : null}
  </div>
</main>
  );
};

export default Home;
