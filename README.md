# NERG stack (NextJS, ExpressJS, Redux, GraphQL)
This is a complete boilerplate using various [Zeit examples](https://github.com/zeit/next.js/tree/master/examples).
It uses
- NextJS
- Redux
- Apollo
- Express
- GraphQL
- PostgresQL (it can use any other SQL DB)

## Features and Live Demo
The boilerplate features examples on how to use GraphQL with Server Side Rendering.

You can view the live demo [here](https://nerg.now.sh).

## How to use
First of all, download or clone the repository.

### Development
- Download or clone the repository
- `npm install`
- `npm run dev`
- Navigate to `localhost:3000`

### Production
The `package.json` file has been setup to be run in `now` or in `heroku` but it can run in a VPS as well by running the `npm run prod` and `npm start` commands

#### Now
To deploy to now simply type `now` and fill up the `DATABASE_URL` environment variable.

#### Heroku
To deploy to Heroku you'll have to create an app in heroku's dashboard, then create (for this example) create a postgresql database then push your changes using `git push heroku master`
