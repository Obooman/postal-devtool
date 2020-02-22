import React from "react";

export default function EventItem({ clickHandler, event, active, index }) {
  const title = `${event.channel}/${event.topic}`;

  return (
    <div
      className={`event-row ${active === index && "selected"}`}
      onClick={() => clickHandler(index)}
      aria-label={title}
    >
      {title}
    </div>
  );
}
