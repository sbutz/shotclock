import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { shotclockConverter } from "./lib/ShotclockConverter";
import { IShotclock, Shotclock } from "./lib/Shotclock";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";

export default function useShardShotclock(id: string) {
    const ref = doc(db, `shotclocks/${id}`).withConverter(shotclockConverter);
    const [value, loading, error] = useDocumentDataOnce<Shotclock>(ref);
    const [shotclock, setShotclock] = useState<Shotclock|undefined>(value);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    useEffect(() => {
        if (error) {
            throw error;
        } else if (!loading && value) {
            console.debug(`Loaded shotclock. Id=${id}`, value);
            setShotclock(value);
        } else if (!loading && !value) {
            console.debug(`Created new shotclock. Id=${id}`);
            setShotclock(new Shotclock());
        }
    }, [id, value, loading, error]);

    const updateFirestore = async () => {
        console.debug("sync");
        setDoc(ref, shotclock);
    };

    const withUpdateFirestore = (obj: Shotclock, fn: Function) => {
        return (...args: any[]) => {
            const ret = fn.call(obj, ...args);
            updateFirestore();
            return ret;
        }
    };

    useEffect(() => {
        if (shotclock) {
            setRemainingTime(Math.round(shotclock.getRemainingTime()));
            setIsStarted(shotclock.isStarted());
            const intervalId = setInterval(() => {
                setIsStarted(shotclock.isStarted());
                setRemainingTime(Math.round(shotclock.getRemainingTime()));
            }, 250);

            return () => clearInterval(intervalId);
        }
    }, [shotclock]);

    if (shotclock) {
        const ret : IShotclock = {
            newRack: withUpdateFirestore(shotclock, Shotclock.prototype.newRack),
            newShot: withUpdateFirestore(shotclock, Shotclock.prototype.newShot),
            isStarted: () => isStarted,
            start: withUpdateFirestore(shotclock, Shotclock.prototype.start),
            pause: withUpdateFirestore(shotclock, Shotclock.prototype.pause),
            getRemainingTime: () => remainingTime,
            setRemainingTime: withUpdateFirestore(shotclock, Shotclock.prototype.setRemainingTime),
            hasExtension: (player) => shotclock.hasExtension(player),
            useExtension: withUpdateFirestore(shotclock, Shotclock.prototype.useExtension),
        }
        return ret;
    }
}
