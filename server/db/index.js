import Sequelize from 'sequelize';

const conn = new Sequelize(process.env.DATABASE_URL, { // eslint-disable-line
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },

  pool: {
    max: 10,
    min: 0,
    idle: 30000
  }
});
conn
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  Post.sync();
  Comment.sync();
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const Post = conn.define('post', {
  title: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  content: {
    type: Sequelize.STRING(250),
    allowNull: false
  }
});

const Comment = conn.define('comment', {
  title: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
});

Comment.belongsTo(Post);
Post.hasMany(Comment);

export default conn;
