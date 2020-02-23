const initialState = {
  events: [],
  currentItem: -1,
  sticky: true,
  recording: true,
  filter: /./,
  filteredItems: []
};

const globalModel = {
  state: initialState,
  reducers: {
    pushEvent(state, payload) {
      if (!state.recording) {
        return state;
      }

      const eventStr = `${payload.channel}/${payload.topic}`;
      let filteredItems = state.filteredItems;

      if (state.filter.test(eventStr)) {
        filteredItems = filteredItems.concat([payload]);
      }

      return {
        ...state,
        events: state.events.concat([payload]),
        filteredItems
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
        ...state,
        events: [],
        currentItem: -1,
        filteredItems: []
      };
    },
    changeBottomSticky(state, payload) {
      return {
        ...state,
        sticky: payload
      };
    },
    toogleRecord(state, payload) {
      return {
        ...state,
        recording: !state.recording
      };
    },
    updateFilter(state, payload) {
      const filteredItems = state.events.filter(event => {
        const { topic, channel } = event;
        const eventName = `${channel}/${topic}`;
        return payload.test(eventName);
      });

      return {
        ...state,
        filter: payload,
        filteredItems
      };
    }
  },
  effects: dispatch => ({})
};

export default globalModel;
