const { createStore, applyMiddleware } = require("redux");

//third party middleware
const loggerMiddleware = require("redux-logger").createLogger();

//custom middleware
const customLogger = () => {
  return (next) => {
    return (action) => {
      console.log("Action Fired", action);
      next(action);
    };
  };
};

//Initial state
const initialstate = {
  posts: [],
};

//Actions

const fetchPostRequest = () => {
  return {
    type: "REQUEST_STARTED",
  };
};

const fetchPostSuccess = () => {
  return {
    type: "FETCH_SUCCESS",
  };
};

const fetchPostFail = () => {
  return {
    type: "REQUEST_FAILED",
  };
};

//Reducers

const postsReducers = (state = initialstate, action) => {
  switch (action.type) {
    case "REQUEST_STARTED":
      return {
        posts: ["HTML"],
      };
  }
};

//store

const store = createStore(
  postsReducers,
  applyMiddleware(loggerMiddleware, customLogger)
);

//subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});

//dispatch
store.dispatch(fetchPostRequest());
