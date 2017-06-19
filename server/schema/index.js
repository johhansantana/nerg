import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';
import { posts, comments } from './queries';
import { addPost } from './mutations/posts';
import { addComment } from './mutations/comments';

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    posts,
    comments
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutate stuff',
  fields: {
    addPost,
    addComment
  }
});

const schema = new GraphQLSchema({
  query,
  mutation
});

export default schema;