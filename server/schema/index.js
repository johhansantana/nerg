import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import db from '../db';
import { commentType, postType } from './types';
import { posts, comments } from './queries';

// TODO separate functions

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
    addPost: {
      type: postType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        content: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve: (source, args) => {
        return db.models.post.create({
          title: args.title,
          content: args.content,
        });
      }
    },
    addComment: {
      type: commentType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        comment: {
          type: new GraphQLNonNull(GraphQLString),
        },
        postId: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (source, args) => {
        return db.models.comment.create({
          title: args.title,
          comment: args.comment,
          postId: args.postId
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