import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';
import userType from './userType';

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

export default articleType;