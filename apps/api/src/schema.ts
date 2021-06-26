import { createApplication } from 'graphql-modules';

import { booksModule } from './modules/books';
import { helloModule } from './modules/helloModule';

export const getSchema = () => {
  const application = createApplication({
    modules: [helloModule, booksModule],
  });

  return application.createSchemaForApollo();
};
