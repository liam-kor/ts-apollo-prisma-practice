import { makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { join } from 'path';
import {
  mutationField,
  queryField,
  stringArg,
  objectType
} from '@nexus/schema';
import { hash } from 'bcryptjs';

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

const resolvers = {
  users : queryField('users', {
    nullable: true,
    type: 'User',
    list: true,
    resolve(_root, _args, ctx) {
      return ctx.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          password: false,
          nickname: true,
          created_at: true,
          updated_at: true,
        }
      });
    },
  }),
  createUser: mutationField('createUser', {
    type: 'User',
    nullable: false,
    args: {
      email: stringArg({ required: true }),
      password: stringArg({ required: true }),
    },
    resolve: async (_root, { email, password }, ctx) => {
      const exists = await ctx.prisma.user.findMany({ where: { email: email } });
      if (exists.length > 0) {
        throw new Error('Duplicated email');
      }
  
      const cryptedPassword = await hash(password, 10);
  
      const user = {
        email: email,
        password: cryptedPassword,
      };
  
      return ctx.prisma.user.create({
        data: user,
      });
    },
  })
}

export const schema = makeSchema({
  types: {
    models,
    resolvers,
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
