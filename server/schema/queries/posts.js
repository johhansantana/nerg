import {
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from 'graphql';
import db from '!/server/db';
import { postType } from '../types';

const posts = {
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
};

export default posts;