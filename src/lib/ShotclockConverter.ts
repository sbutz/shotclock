import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";
import { Config, Player, Shotclock } from "./Shotclock";
import { Timer } from "./Timer";

const ttl = 1000 * 60 * 60 * 12; // 12 hours in milliseconds

export const shotclockConverter: FirestoreDataConverter<Shotclock> = {
    toFirestore(clock: Shotclock): DocumentData {
      return { ...clock.toObject(), expireAt: Timestamp.fromMillis(Timestamp.now().toMillis() + ttl) };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Shotclock {
      const data = snapshot.data(options);
      const config = data.config as Config;
      const timer = new Timer(data.timer.timeLimit, data.timer.startTime, data.timer.remainingTimeOnPause);
      const extensions = new Set<Player>(data.extensions);
      return new Shotclock(config, timer, extensions);
    },
  };