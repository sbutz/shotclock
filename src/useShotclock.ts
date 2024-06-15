import { useEffect, useState } from "react";
import { IShotclock, Shotclock } from "./lib/Shotclock";

export default function useShotclock() {
  const clock = useState(new Shotclock())[0];
  const [remainingTime, setRemainingTime] = useState(Math.round(clock.getRemainingTime()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(Math.round(clock.getRemainingTime()));
    }, 250);

    return () => clearInterval(intervalId);
  }, [clock]);

  const ret : IShotclock = {
    newRack: () => clock.newRack(),
    newShot: () => clock.newShot(),
    isStarted: () => clock.isStarted(),
    start: () => clock.start(),
    pause: () => clock.pause(),
    getRemainingTime: () => remainingTime,
    setRemainingTime: (seconds: number) => clock.setRemainingTime(seconds),
    hasExtension: (player) => clock.hasExtension(player),
    useExtension: (player) => clock.useExtension(player),
  }
  return  ret;
}