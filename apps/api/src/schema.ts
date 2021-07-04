import { createApplication } from 'graphql-modules';

import { helloModule } from './modules/helloModule';
import { bookModule } from './modules/bookModule';
import { authorModule } from './modules/authorModule';
import { searchModule } from './modules/search';

export const getSchema = () => {
  const application = createApplication({
    modules: [helloModule, bookModule, authorModule, searchModule],
  });

  return application.createSchemaForApollo();
};
