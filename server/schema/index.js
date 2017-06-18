import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import db from '../db';
import { commentType, postType } from './types';

// TODO separate functions

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    posts: {
      type: new GraphQLList(postType),
      args: {
        id: {
          type: GraphQLInt
        },
        title: {
          type: GraphQLString
        },
        content: {
          type: GraphQLString
        },
      },
      resolve: (_, args) => {
        return db.models.post.findAll({ where: args });
      }
    },
    comments: {
      type: new GraphQLList(commentType),
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (_, args) => {
        return db.models.comment.findAll({ where: args });
      }
    }
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