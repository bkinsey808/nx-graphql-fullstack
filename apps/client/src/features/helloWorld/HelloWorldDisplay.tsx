import { useQuery, gql } from '@apollo/client';

import { HelloWorld } from './__generated__/HelloWorld';

const HELLO_WORLD = gql`
  query HelloWorld {
    hello
  }
`;

export const HelloWorldDisplay = () => {
  const { loading, error, data } = useQuery<HelloWorld>(HELLO_WORLD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data);
  return <div>Hello, {data?.hello}</div>;
};
