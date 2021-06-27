import { createApplication } from 'graphql-modules';

import { helloModule } from './modules/helloModule';
import { booksModule } from './modules/books';
import { authorsModule } from './modules/authors';

export const getSchema = () => {
  const application = createApplication({
    modules: [helloModule, booksModule, authorsModule],
  });

  return application.createSchemaForApollo();
};
