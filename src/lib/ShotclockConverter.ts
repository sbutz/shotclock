import { Player, Shotclock } from "./Shotclock";
import { Timer } from "./Timer";
import { Config } from "./ShotclockConfig";

const ttl = 1000 * 60 * 60 * 12; // 12 hours in milliseconds

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
  expireAt: number;
};

export function toRealtimeShotclock(clock: Shotclock): ShotclockData {
  return {
    ...clock.toObject(),
    expireAt: Date.now() + ttl,
  };
}

export function fromRealtimeShotclock(data: any): Shotclock {
  const config = new Config(data.config.shotTime, data.config.extensionTime, data.config.firstShotTime);
  const timer = new Timer(data.timer.timeLimit, data.timer.startTime, data.timer.remainingTimeOnPause);
  const extensions = new Set<Player>(data.extensions || []);
  return new Shotclock(config, timer, extensions);
}