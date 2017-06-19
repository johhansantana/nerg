import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import { postType } from '!/server/schema/types';
import db from '!/server/db';

const addPost = {
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
};

export default addPost;