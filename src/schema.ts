import { makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { join } from 'path';
import { objectType } from '@nexus/schema';

const models = {
    User:  objectType({
        name: 'User',
        definition(t) {
          t.model.id();
          t.model.email();
          t.model.password();
          t.model.nickname();
          t.model.created_at();
          t.model.updated_at();
        },
      })
}

export const schema = makeSchema({
  types: {
    models,
  },
  plugins: [nexusSchemaPrisma()],
  outputs: {
    typegen: join(__dirname, '..', 'generated/nexus.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('./context'),
        alias: 'ContextModule',
      },
    ],
    contextType: 'ContextModule.Context',
  },
});
