import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';
import articleType from './articleType';

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

export default userType;