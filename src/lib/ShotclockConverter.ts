import { Player, Shotclock } from "./Shotclock";
import { Timer } from "./Timer";
import { Config } from "./ShotclockConfig";
import { serverTimestamp } from "firebase/database";

type ServerTimestampValue = ReturnType<typeof serverTimestamp>;

type ShotclockData = {
  config: {
    shotTime: number;
    extensionTime: number;
    firstShotTime?: number;
  };
  timer: {
    timeLimit: number;
    startTime?: number;
    remainingTimeOnPause?: number;
  };
  extensions: Player[];
  expireAt: number | ServerTimestampValue;
};

export function toRealtimeShotclock(clock: Shotclock): ShotclockData {
  return {
    ...clock.toObject(),
    expireAt: serverTimestamp(),
  };
}

export function fromRealtimeShotclock(data: any): Shotclock {
  const config = new Config(data.config.shotTime, data.config.extensionTime, data.config.firstShotTime);
  const timer = new Timer(data.timer.timeLimit, data.timer.startTime, data.timer.remainingTimeOnPause);
  const extensions = new Set<Player>(data.extensions || []);
  return new Shotclock(config, timer, extensions);
}