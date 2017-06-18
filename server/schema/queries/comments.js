import {
  GraphQLList,
  GraphQLInt
} from 'graphql';
import { commentType } from '../types';
import db from '!/server/db';

const comments = {
  type: new GraphQLList(commentType),
  args: {
    id: {
      type: GraphQLInt
    }
  },
  resolve: (_, args) => {
    return db.models.comment.findAll({ where: args });
  }
};

export default comments;