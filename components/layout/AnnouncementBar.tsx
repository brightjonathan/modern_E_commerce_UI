"use client";

import { useEffect, useState } from "react";
import { announcements } from "@/Data/Navigation";


const AnnouncementBar = () => {

     const [index, setIndex] = useState(0);
     const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-brand-700 via-violet-600 to-accent-600 text-white">
      <div className="container-x flex h-10 items-center justify-center">
        <p key={index} className="animate-fade-up truncate px-8 text-center text-xs font-medium sm:text-sm">
          {announcements[index]}
        </p>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute top-1/2 right-3 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full transition hover:bg-white/20 sm:right-6"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M5.3 5.3a1 1 0 011.4 0L10 8.6l3.3-3.3a1 1 0 111.4 1.4L11.4 10l3.3 3.3a1 1 0 01-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 01-1.4-1.4L8.6 10 5.3 6.7a1 1 0 010-1.4z" /></svg>
        </button>
      </div>
    </div>
  )
}

export default AnnouncementBar;
