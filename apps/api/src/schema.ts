import { createApplication } from 'graphql-modules';

import { helloModule } from './modules/helloModule';

export const getSchema = () => {
  const application = createApplication({
    modules: [helloModule],
  });

  return application.createSchemaForApollo();
};
