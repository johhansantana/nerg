import Sequelize from 'sequelize';

const conn = new Sequelize('db_name', 'db_user', 'db_password', {
  host: 'localhost',
  dialect: 'postgres',

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
  User.sync();
  Article.sync();
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Article = conn.define('article', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

Article.belongsTo(User);
User.hasMany(Article);

export default conn;
