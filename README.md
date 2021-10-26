# Populator
Ever find yourself spending more time in filling forms than spending time coding?
This package will help you fill your spa forms with your preset data, and you can easily set the condition of using it or not with your environment variable at compilation with tool of your choice!

## Usage
Install your dependency
```bash
npm install stephenkhoo/populator
```

## Examples
### Using single field populate
```js
// Create a file mypopulator.js
const populator = require('stephenkhoo/populator');

// You define your data to be filled with three layer
// domain > name of the field > value to be populated
// These data are use for testing during development
const populateData = {
  login: {
    username: 'TestUser',
    password: 'TestUserPassword' // P/S, never commit actual password into your code
  }
};

const shouldPopulate = process.env.YOUR_ENV_TO_DECIDE_WHEN_TO_POPULATE;
// or
const shouldPopulate = your_computed_condition_to_decide_when_to_populate;

const { populate } = populator(shouldPopulate, populateData);

module.exports = populate;
```
In your other files
```js
const populate = require('./mypopulator.js');

let value = populate('login', 'username', ''); // The third parameter used is the value to be used when it shouldn't populate
```
If you are using react, and it's state for the field value
```js
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: populate('login', 'username', ''),
      password: populate('login', 'password', ''),
    }
  }
}
```
Or vue
```js
import { reactive } from 'vue'
reactive({
  username: populate('login', 'username', ''),
  password: populate('login', 'password', ''),
})
```

### Using mass populate
```js
// Create a file mypopulator.js
const populator = require('stephenkhoo/populator');

// Main part of setup is the same
const populateData = {
  login: {
    username: 'TestUser',
    password: 'TestUserPassword' // P/S, never commit actual password into your code
  }
};

const shouldPopulate = process.env.YOUR_ENV_TO_DECIDE_WHEN_TO_POPULATE;
// or
const shouldPopulate = your_computed_condition_to_decide_when_to_populate;

const { massPopulate } = populator(shouldPopulate, populateData);

module.exports = massPopulate;
```
In your other files
```js
const massPopulate = require('./mypopulator.js');

let values = massPopulate('login', {
  username: ''
  }); // The key value of the object will be translate into populate('login', key, value)
```
If you are using react, and it's state for the field value
```js
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = massPopulate('login', {
      username: '',
      password: '',
    });
  }
}
```
Or vue
```js
import { reactive } from 'vue'
reactive(massPopulate('login', {
  username: '',
  password: '',
}))
```
> Personally I find mass populate much closer to my taste, but it is up to you to choose which to use.

---

_Made with love by [@stephen_khoo](https://twitter.com/stephen_khoo)_
