import { ADD_POST } from "../Actions/AddPostAction";
import { EDIT_POST } from "../Actions/EditPostAction";
import { INC_REACT } from "../Actions/IncrementReaction";

const initialState = {
  posts: [],
  reactions: [],
};

const initialReactions = {
  thumbsUp: 0,
  heart: 0,
  insightful: 0,
  funny: 0,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        reactions: [
          ...state.reactions,
          { id: action.payload.id, ...initialReactions },
        ],
      };
    case EDIT_POST:
      const filteredPosts = state.posts.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        posts: [action.payload, ...filteredPosts],
      };
    case INC_REACT:
      return {
        ...state,
        reactions: state.reactions.map((item) =>
          action.payload.id === item.id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};

export default blogReducer;
