import React, { useRef } from "react";
import EventItem from "./EventItem";
import { connect } from "react-redux";

let element;

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
