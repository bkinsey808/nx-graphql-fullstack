import { fetch } from 'cross-fetch';
import * as fs from 'fs';

const body = JSON.stringify({
  variables: {},
  query: `
    query PossibleTypes {
      __schema {
        types {
          kind
          name
          possibleTypes {
            name
          }
        }
      }
    }
  `,
});

fetch(`http://localhost:4000/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body,
})
  .then((result) => {
    return result.json();
  })
  .then((result) => {
    const possibleTypes = {};

    result.data.__schema.types.forEach((supertype) => {
      if (supertype.possibleTypes)
        possibleTypes[supertype.name] = supertype.possibleTypes.map(
          (subtype) => subtype.name
        );
    });

    fs.writeFile(
      './libs/api-interfaces/possibleTypes.json',
      JSON.stringify(possibleTypes),
      (err) => {
        if (err) console.error('Error writing possibleTypes.json', err);
        else console.log('Fragment types successfully extracted!');
      }
    );
  });
