export const EDIT_POST = 'EDIT_POST';

export const editPost = (post) => ({
    type: EDIT_POST,
    payload: post
  });