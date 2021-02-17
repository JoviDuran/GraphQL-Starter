import path from 'path';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { schemaPermissions } from './graphql-shield';
import * as scalars from '../modules/common/graphql/scalars';
import * as enums from '../modules/common/graphql/enums';
import { GraphQLSchema } from 'graphql';

const getTypeDefs = async () => {
  return loadFiles('src/modules/**/graphql/*.graphql', { recursive: true });
};

const getResolvers = async () => {
  return loadFiles(path.join(__dirname, 'resolvers/**/index.*'), { ignoreIndex: false, extensions: ['.js', '.ts'] });
};

const getResolvers2 = async () => {
  return loadFiles('src/modules/**/graphql/resolvers/index.*', { ignoreIndex: false, extensions: ['.js', '.ts'], recursive: true });
};

export const initializeSchema = async (): Promise<GraphQLSchema> => {
  // Create schema
  const resolverArray = [await getResolvers(), await getResolvers2()].flat();

  const resolvers = {
    ...mergeResolvers(resolverArray),
    ...enums,
    ...scalars,
  };

  const typeDefs = mergeTypeDefs(await getTypeDefs());

  let graphqlSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: { log: (e) => console.info(e) },
  });

  // Apply graphql-shield middleware
  graphqlSchema = applyMiddleware(graphqlSchema, schemaPermissions);

  return graphqlSchema;
};
