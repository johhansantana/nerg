import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';
import commentType from './commentType';

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString

    },
    comments: {
      type: new GraphQLList(commentType),
      resolve(post) {
        return post.getComments();
      }
    }
  })
});

export default postType;