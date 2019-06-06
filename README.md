# Payever test

Comes with:

- ES6 support.
- ESLint for code linting.
- Configuration management using dotenv.
- Logging of requests with Winston.
- Tests using Mocha/Chai.
- Coverage report through nyc.
---

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)

## Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone git@github.com:Rogergonzalez21/payever-test.git <application-name>
    $ cd <application-name>
    $ rm -rf .git
    $ npm install

Make a copy of `.env.example` as `.env` and update your application details and database credentials.

### Environment variables description

- `NODE_ENV`: The node environment
- `PORT`: Application port. If not specified, it defaults to port 7777.
- `TEST_PORT`: Port to run tests.

This in an example of a `.env` file

```env
NODE_ENV=development
PORT=3000
TEST_PORT=3333
```

### Starting the application

    $ npm run start

## Tests

If you have set the test database on the .env file, you can run the tests by using

    $ npm run test

## License

payever-test is under [MIT License](LICENSE).
