import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import db from '../db';

const articleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    createdBy: {
      type: userType,
      resolve(article) {
        return article.getUser();
      }
    }
  })
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString

    },
    email: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    articles: {
      type: new GraphQLList(articleType),
      resolve(user) {
        return user.getArticles();
      }
    }
  })
});

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: {
      type: new GraphQLList(userType),
      args: {
        id: {
          type: GraphQLInt
        },
        name: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
      },
      resolve: (_, args) => {
        return db.models.user.findAll({ where: args });
      }
    },
    articles: {
      type: new GraphQLList(articleType),
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (_, args) => {
        return db.models.article.findAll({ where: args });
      }
    }
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutate stuff',
  fields: {
    addUser: {
      type: userType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (source, args) => {
        return db.models.user.create({
          name: args.name,
          lastName: args.lastName,
          email: args.email,
          password: args.password
        });
      }
    },
    addArticle: {
      type: articleType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        description: {
          type: new GraphQLNonNull(GraphQLString),
        },
        userId: {
          type: new GraphQLNonNull(GraphQLInt),
        }
      },
      resolve: (source, args) => {
        return db.models.article.create({
          name: args.name,
          description: args.description,
          userId: args.userId
        });
      }
    }
  }
});

const schema = new GraphQLSchema({
  query,
  mutation
});

export default schema;