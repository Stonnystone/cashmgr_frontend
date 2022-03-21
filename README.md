# Authentication system using REST API

## Frontend Works

The frontend is completely implemented by using [React JS](https://reactjs.org/). UI design is done with the use of my own redefined Bootstrap framework(v.5.0.2) and [react-bootstrap](https://react-bootstrap.github.io/). Here I provide the link of my [Bootstarp](https://github.com/ramkumarm15/bootstarp-modified).

The state management is done by [redux](https://redux.js.org/), [react-redux](https://react-redux.js.org/). React let us build a UI as a function of a state and redux manages the state of data fetched from the [Django](https://www.djangoproject.com/) server(backend) using API request and updates the state when changes occur or the action happened.

To send an API request to the Django server and get data of credential details of the user, I used [Axios](https://axios-http.com/) to perform an API request. In the beginning, Axios instance with base URL of server has been created for all API requests to be sent.

Usually, react js and Django runs in a separate localhost port, Here I integrate react js and Django to run on the same port which means ReactJS related files came from Django.

I have covered almost 70% of authentication works in frontend which implemented in Django. 
For Eg. 
- [X] Login
- [x] Signup 
- [x] Account Activation
- [x] Password reset link
- [x] Password rest confirm 
- [x] Check Authentication
- [x] JWT access token verify when user logged-in after some time
- [x] Display errors when register an user account like not an unique email, check for strong password
- [x] Access to page for specific user like Admin user
"# cashmgr_frontend" 
