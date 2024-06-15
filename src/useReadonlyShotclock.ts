import { doc } from "firebase/firestore";
import { db } from "./Firebase";
import { shotclockConverter } from "./lib/ShotclockConverter";
import { IReadonlyShotclock, Player, Shotclock } from "./lib/Shotclock";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";

export default function useShardShotclock(id: string) {
    const ref = doc(db, `shotclocks/${id}`).withConverter(shotclockConverter);
    const [value, loading, error] = useDocumentData<Shotclock>(ref);
    const [shotclock, setShotclock] = useState<Shotclock|undefined>(value);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    useEffect(() => {
        if (error) {
            throw error;
        } else if (!loading && value) {
            setShotclock(value);
        }
    }, [id, value, loading, error]);

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
        return [{
            isStarted: () => isStarted,
            getRemainingTime: () => remainingTime,
            hasExtension: (player: Player) => shotclock.hasExtension(player),
        } as IReadonlyShotclock, false, undefined];
    } else {
        return [undefined, loading, error];
    }
}
