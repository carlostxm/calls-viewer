# Aircall Frontend Technical Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and use the Aircall's Design System called [Tractor](https://tractor.aircall.io/).

# Functionality

This application implements the following functionality:

- Display a paginated list of calls grouped by date.
- Display the call details view in a slider panel when the user clicks in the view link at the end of the table's row.
- Archive or un-archive one or multiple calls and display the results on real-time.
- Authentication is managed by a login form displayed when the application is started.

# Start the application

Just execute `npm install` and `npm start`.

# Project structure

## Folders

| Folder      | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| api         | Functions for HTTP requests                                                 |
| components  | UI components                                                               |
| context     | Context definitions i.e. `mapLayers` that contains the app global state     |
| fixtures    | Static mocked data                                                          |
| hooks       | Common hooks reusable by the components                                     |
| reducers    | Global state's reducer functions                                            |
| screens     | Application's screens                                                       |
| translators | Utility function specialized in converting objects from one type to another |

## Main Components

| Component              | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| index.tsx              | Attaches React root node to the DOM and add the Tractor's ThemeProvider          |
| App.tsx                | Application main component                                                       |
| AuthenticatedApp.tsx   | Fetchs and displays the calls when the user has been logged in                   |
| UnauthenticatedApp.tsx | Displays the login form                                                          |
| AuthProvider.tsx       | Manages the user authentication and pass to the components using React Context   |
| CallsViewer.tsx        | Displays Pagination component and the CallsPage based on the Pagination settings |
| CallsPage.tsx          | Displays the calls for a page grouped by date                                    |
| CallsTable.tsx         | Displays the call attributes in a tabular format                                 |
| CallDetails.tsx        | Displays a detailed view of the call selected                                    |

## Custom Hooks

| Name         | Description                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| useAuth      | Exposes AuthContext state and functions and checks that the component has been wrapped in AuthProvider |
| useCallsPage | Manages Calls page data and fetching operations                                                        |

## Data Fetching

Function `client` manage fetch request throw `window.fetch` this is a simple approach that probably could be improved using `Axios`, `react-query` or other data fetching library. In the case of `Axios`, it provides the `interceptors` functionality which can be useful to manage the access token refreshing, or `cancel tokens` to cancel duplicated requests.

## Tests

I got some problems in the tests of components using the library `@aircall/tractor`.

# Improvements

These are things that I would have liked to implement but I didn`t finally by lack of time:

- Refresh the access token when it expires. Here I would liked to use Axios interceptors or create a new custom hook i.e. useAsync to intercept each API call being able to refresh the token when a 401 error is returned.
- Recover session after closing the application to avoid show the Login form each time the application is opened.
- Increase test coverage.
- Loading spinner while fetching.
