import React, { useEffect, useState } from "react";
import EventsList from "./EventList";
import "../CSS-components/HomeBody.css";
import AddEvent from "./AddEvent";
import Details from "./EventDetail";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

export default function HomeBody(props) {
  const [events, setEvents] = useState(Details);
  //search bar implemetation trail
  useEffect(() => {
    const temp = Details.filter((item) => {
      return item.festName
        .toLowerCase()
        .startsWith(props.searchValue.toLowerCase());
    });
    // setEventValues(temp);
    setEvents(temp);
  }, [props.searchValue]);

  const [add, setAdd] = useState(false);

  function toggleAdd() {
    setAdd(!add);
  }

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="HomeBody bg-gradient-to-b from-slate-900 to-slate-950 h-full">
      <div className=" text-slate-200 flex items-center justify-center w-[20%]">
        {!add && (
          <div className="flex flex-col justify-around items-center h-[100%] w-[100%]">
            <div className=" bg-slate-400 border-2 rounded-full">
              <Clock value={value} size="30vh" />
            </div>
            <h1 className=" text-lg font-bold text-slate-200 shadow-slate-100">
              Even a broken clock shows right time twice a day
            </h1>
            <h1 className=" text-4xl font-bold text-slate-200">
              {new Date().toLocaleDateString()}
            </h1>
            <button
              onClick={toggleAdd}
              className=" w-fit h-fit p-4 border-3  bg-black bg-opacity-60 border-2 border-black shadow-sm hover:bg-opacity-100 flex items-center justify-center hover:shadow-stone-800 hover:shadow-xl"
            >
              Add event
            </button>
          </div>
        )}
        {add && <AddEvent setEvents={setEvents} toggleAdd={toggleAdd} />}
      </div>
      <div className="EventListDiv overflow-x-hidden">
        <EventsList events={events} />
      </div>
    </div>
  );
}
