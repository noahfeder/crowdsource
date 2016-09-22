export default function(state = null, action) {
  switch (action.type) {
    case 'NEW_SCENE':
      return action.payload;
    default: return state;
  }
};
