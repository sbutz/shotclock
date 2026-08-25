import { get, ref, set } from "firebase/database";
import { db } from "./Firebase";
import { fromRealtimeShotclock, toRealtimeShotclock } from "./lib/ShotclockConverter";
import { IShotclock, Shotclock } from "./lib/Shotclock";
import { useCallback, useEffect, useState } from "react";
import { Config, defaultConfig } from "./lib/ShotclockConfig";

export default function useShardShotclock(id: string) {
    const shotclockRef = ref(db, `shotclocks/${id}`);
    const [shotclock, setShotclock] = useState<Shotclock|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error|undefined>(undefined);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [config, setConfig] = useState<Config>(defaultConfig);

    const updateDatabase = useCallback(async () => {
        if (!shotclock) {
            return;
        }
        console.debug("sync");
        await set(shotclockRef, toRealtimeShotclock(shotclock));
    }, [shotclock, shotclockRef]);

    const withUpdateDatabase = (obj: Shotclock, fn: Function) => {
        return (...args: any[]) => {
            const ret = fn.call(obj, ...args);
            updateDatabase();
            return ret;
        }
    };

    const update = useCallback(() => {
        if (shotclock) {
            setIsStarted(shotclock.isStarted());
            setRemainingTime(Math.round(shotclock.getRemainingTime()));
            setConfig(shotclock.getConfig());
        }
    }, [shotclock]);

    useEffect(() => {
        const load = async () => {
            try {
                const snapshot = await get(shotclockRef);
                if (snapshot.exists()) {
                    const loadedClock = fromRealtimeShotclock(snapshot.val());
                    console.debug(`Loaded shotclock. Id=${id}`, loadedClock);
                    setShotclock(loadedClock);
                } else {
                    console.debug(`Created new shotclock. Id=${id}`);
                    const sc = new Shotclock();
                    setShotclock(sc);
                    await set(shotclockRef, toRealtimeShotclock(sc));
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (!shotclock && loading && !error) {
            load();
        }
    }, [shotclock, loading, error, id, shotclockRef]);

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    useEffect(() => {
        if (shotclock) {
            update();
            const intervalId = setInterval(update, 100);
            return () => clearInterval(intervalId);
        }
    }, [update, shotclock]);

    if (shotclock) {
        const ret : IShotclock = {
            newRack: withUpdateDatabase(shotclock, Shotclock.prototype.newRack),
            newShot: withUpdateDatabase(shotclock, Shotclock.prototype.newShot),
            isStarted: () => isStarted,
            start: withUpdateDatabase(shotclock, Shotclock.prototype.start),
            pause: withUpdateDatabase(shotclock, Shotclock.prototype.pause),
            getRemainingTime: () => remainingTime,
            setRemainingTime: withUpdateDatabase(shotclock, Shotclock.prototype.setRemainingTime),
            hasExtension: (player) => shotclock.hasExtension(player),
            useExtension: withUpdateDatabase(shotclock, Shotclock.prototype.useExtension),
            getConfig: () => config,
            setConfig: withUpdateDatabase(shotclock, Shotclock.prototype.setConfig),
        }
        return ret;
    }
}
