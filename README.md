# Property-Pro-Lite
Property Pro Lite is a platform where people can create and/or search properties for sale or rent. 

[![Build Status](https://travis-ci.org/JackieBinya/Property-Pro-Lite.svg?branch=develop)](https://travis-ci.org/JackieBinya/Property-Pro-Lite)[![Coverage Status](https://coveralls.io/repos/github/JackieBinya/Property-Pro-Lite/badge.svg?branch=develop)](https://coveralls.io/github/JackieBinya/Property-Pro-Lite?branch=develop)[![Maintainability](https://api.codeclimate.com/v1/badges/f98f3f6f68ff073444ab/maintainability)](https://codeclimate.com/github/JackieBinya/Property-Pro-Lite/maintainability)

### UI templates: https://jackiebinya.github.io/Property-Pro-Lite/
### API Link: https://property-pro-lite-jb.herokuapp.com/
### Pivotal Tracker Link: https://www.pivotaltracker.com/n/projects/2356449

## Built With
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/)
- Javascript
- CSS
- HTML

## Features
- User can sign up.  
- User can sign in.  
- User (agent) can post a property advert.  
-  User (agent) can update the details of a property advert.  
- User (agent) can mark his/her posted advert as sold.  
- User (agent) can delete a property advert.  
- User can view all properties adverts.  
- User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.  
- User can view a specific property advert. 

## Installation
1. Make sure you have Node.js and npm installed
2. Clone this repo
`git@github.com:JackieBinya/Property-Pro-Lite.git`
3. Install dependecies 
`npm install`
4.Create .env file, copy constants in .env.sample. Then add your own details.
5. Start server
`npm run dev:start`

## Supporting Packages
Linter
- [ESLint](https://eslint.org/) - Linter Tool

Compiler
- [Babel](https://babeljs.io/docs/en/) - Compiler for next generation Javascript

## Test Driven Development
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Chai-http](https://www.chaijs.com/plugins/chai-http/)
- [Instabul(nyc)](https://istanbul.js.org/)
 
 1.  Clone this repo
`git@github.com:JackieBinya/Property-Pro-Lite.git`
2. Install dependecies 
`npm install`
3. Run Test
`npm test`
4. Run Coverage Report
`npm run coverage`

Continous Intergration
```
* Travis CI & CodeClimate for test automation
* Coveralls for test coverage report
```

## API Endpoints
| DESCRIPTION                      | HTTP METHOD     | ROUTES                   |
| --------------------------------- |:--------------:| :------------------------:|
| Sign Up                       | POST |/api/v1/auth/signup|
| Sign In    | POST      |   /api/v1/auth/signin |
| Post property ad | POST    |    /api/v1/property|
| Edit a property ad | PATCH    |    /api/v1/property/<property-id
| Mark a property sold | PATCH    |    /api/v1/property/<property-id>/sold|
| Delete a property ad | DELETE   |    /api/v1/property/<property-id>|
| View all properties | GET    |    /api/v1/property/|
| View a specifi property ad | GET    |    /api/v1/property/<property-id>/specific-property|
| View property ad of a specific type | GET    |    /api/v1/property/?<type=PropertyType>|
| View a own ads | GET    |    /api/v1/property/my-ads|

## References
- [Andela HomeStudy Curriculum](https://homestudy.andela.com/?utm_campaign=Pre-fellowship%20Call%20for%20Applications&utm_source=hs_email&utm_medium=email&utm_content=68259149&_hsenc=p2ANqtz--wErDpFaSPQg4Z9fWs9YV6uraKM7xcKOTVpSbCxmk5pArnWStcIfmlEKRv_USwRjoMcCs42W4madEkjUvoW2XbvlFicQ&_hsmi=68259149)

## Lisense
- MIT
