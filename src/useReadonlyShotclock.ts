import { onValue, ref } from "firebase/database";
import { db } from "./Firebase";
import { fromRealtimeShotclock } from "./lib/ShotclockConverter";
import { IReadonlyShotclock, Player, Shotclock } from "./lib/Shotclock";
import { useEffect, useState } from "react";

export default function useShardShotclock(id: string) {
    const shotclockRef = ref(db, `shotclocks/${id}`);
    const [shotclock, setShotclock] = useState<Shotclock|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error|undefined>(undefined);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onValue(
            shotclockRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setShotclock(fromRealtimeShotclock(snapshot.val()));
                } else {
                    setShotclock(undefined);
                }
                setLoading(false);
                setError(undefined);
            },
            (err) => {
                setError(err as Error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [shotclockRef]);

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    useEffect(() => {
        if (shotclock) {
            setRemainingTime(Math.round(shotclock.getRemainingTime()));
            setIsStarted(shotclock.isStarted());
            const intervalId = setInterval(() => {
                setIsStarted(shotclock.isStarted());
                setRemainingTime(Math.round(shotclock.getRemainingTime()));
            }, 100);

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
