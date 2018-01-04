# Refactoring exercise

This repository contains a `UserRepository` with a `getUser` method (and other, stubbed out methods).

There are various bad practices showcased within it, and there are no unit tests for it.

Discuss (or implement) how you would go about getting this service under test, and what things you would look to refactor / improve.

## Expected behaviour

When getting a user, aside from actually returning the user object, the following extra hehaviour is required:

* Restrict access to users who have the `get_user` permission (i.e. the user making the request has that permission)
* Log successful access requests to an audit log

## Testing

Although there are currently no tests, a test framework is in place (Mocha + Chai) and available to run.

* `npm install` to install dependencies
* `npm test` to run tests

New tests can be added in the `/test` folder and should have the `.spec.ts` file extension.
