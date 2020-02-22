const initialState = {
  events: [],
  currentItem: -1,
  sticky: true
};

const globalModel = {
  state: initialState,
  reducers: {
    pushEvent(state, payload) {
      return {
        ...state,
        events: state.events.concat([payload])
      };
    },
    changeCurrentItem(state, payload) {
      return {
        ...state,
        currentItem: payload
      };
    },
    clear(state, payload) {
      return {
        events: [],
        currentItem: -1
      };
    },
    changeBottomSticky(state, payload) {
      return {
        ...state,
        sticky: payload
      };
    }
  },
  effects: dispatch => ({})
};

export default globalModel;
