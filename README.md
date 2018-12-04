This is the coding challenge I took that got accepted before coming an 8th Lighter.

### To Play the game:
- `yarn` to install npm modules
- then `yarn start` to start a new game

if you don't have [yarn](https://yarnpkg.com/en/), here's how to install it:

`brew install yarn`
or
`sudo port install yarn`

### To run tests:
- `yarn test:unit`
- if using WebStorm's test runner (like I do), all you need is to set it to the unit test directory then add this for mocha options:
`--recursive --require @babel/register ./javascript/test/test.imports -w --timeout 10000`


