const { createStore, applyMiddleware } = require("redux");
const axios = require("axios");
const thunk = require("redux-thunk").default;
//Actions constants
const REQUEST_STARTED = "REQUEST_STARTED";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILED = "REQUEST_FAILED";
//Initial state
const initialstate = {
  posts: [],
  error: "",
  loading: false,
};

//Actions

const fetchPostRequest = () => {
  return {
    type: REQUEST_STARTED,
  };
};

const fetchPostSuccess = (posts) => {
  return {
    type: FETCH_SUCCESS,
    payload: posts,
  };
};

const fetchPostFail = (error) => {
  return {
    type: FETCH_FAILED,
    payload: error,
  };
};

//action to make the request

const fetchPosts = () => {
  return async (dispatch) => {
    try {
      //dispatch
      dispatch(fetchPostRequest());
      const data = await axios.get("https://jsonplaceholder.typicode.com/post");
      //success
      dispatch(fetchPostSuccess(data));
      //error
    } catch (error) {
      dispatch(fetchPostFail(error.message));
    }
  };
};

//Reducers

const postsReducers = (state = initialstate, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case FETCH_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
  }
};

//store

const store = createStore(postsReducers, applyMiddleware(thunk));

//subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});

//dispatch
store.dispatch(fetchPosts());
