import { printSchema } from 'graphql';

import { getSchema } from '../schema';

const generateSchemaFile = () => {
  const schema = getSchema();
  console.log(printSchema(schema));
};

generateSchemaFile();
