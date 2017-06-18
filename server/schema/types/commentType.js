import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    comment: {
      type: GraphQLString
    },
  })
});

export default commentType;