import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import { commentType } from '!/server/schema/types';
import db from '!/server/db';

const addComment = {
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
};

export default addComment;