import React from "react";

export default function EventItem(props) {
  const { event, active, index } = props;
  const title = `${event.channel}/${event.topic}`;
  return (
    <div
      className={`event-row ${active === index && "selected"}`}
      onClick={() => props.clickHandler(index)}
      aria-label={title}
    >
      {title}
    </div>
  );
}
