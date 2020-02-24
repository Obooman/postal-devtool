import React, { useRef } from "react";
import EventItem from "./EventItem";
import { connect } from "react-redux";
import store from "../model/index";

const lineHeight = 24;
let element;

let pressDownInterval;

document.addEventListener("keydown", ev => {
  const { code } = ev;
  if (/ArrowUp|ArrowDown/.test(code)) {
    ev.preventDefault();

    const { currentItem, filteredItems } = store.getState().global;
    const { dispatch } = store;

    let activeItem;

    if (code === "ArrowUp") {
      activeItem = Math.max(currentItem - 1, 0);
    } else if (code === "ArrowDown") {
      activeItem = Math.min(currentItem + 1, filteredItems.length - 1);
    }

    dispatch.global.changeCurrentItem(activeItem);
    const { scrollTop, offsetHeight } = element.current;

    const activateItemTop = activeItem * lineHeight;
    if (activateItemTop < scrollTop) {
      element.current.scrollTop = activateItemTop;
    }

    if (activateItemTop >= scrollTop + offsetHeight) {
      element.current.scrollTop = activateItemTop - offsetHeight + lineHeight;
    }
  }
});

function EventList({ filteredItems, currentItem, dispatch }) {
  element = useRef(null);

  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "scroll",
        height: "100%"
      }}
      ref={element}
      onScroll={() => {
        const domEle = element.current;
        if (domEle.scrollHeight - domEle.scrollTop - domEle.offsetHeight < 1) {
          dispatch.global.changeBottomSticky(true);
        } else {
          dispatch.global.changeBottomSticky(false);
        }
      }}
    >
      {filteredItems.map((event, index) => (
        <EventItem
          event={event}
          active={currentItem}
          clickHandler={index => dispatch.global.changeCurrentItem(index)}
          key={`${event.timestamp}-${index}`}
          index={index}
        ></EventItem>
      ))}
    </div>
  );
}

export const syncToBottom = function() {
  if (element.current) {
    element.current.scrollTop = element.current.scrollHeight;
  }
};

const mapStateToProps = state => ({
  filteredItems: state.global.filteredItems,
  currentItem: state.global.currentItem
});

export default connect(mapStateToProps, null)(EventList);
