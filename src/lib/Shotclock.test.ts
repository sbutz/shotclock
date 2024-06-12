import exp from "constants";
import { Shotclock, defaultConfig, Player } from "./Shotclock";

jest.useFakeTimers();

function isInitialState(shotclock: Shotclock): boolean {
    return shotclock.isStarted() === false
        && shotclock.getRemainingTime() === defaultConfig.firstShotTime
        && shotclock.hasExtension(Player.Guest) === true
        && shotclock.hasExtension(Player.Home) === true;
}

test('initial state', () => {
    const shotclock = new Shotclock();

    expect(isInitialState(shotclock)).toBe(true);
});

test('start/pause', () => {
    const now = Date.now();
    jest.setSystemTime(now);

    const shotclock = new Shotclock();

    expect(shotclock.isStarted()).toBe(false);

    shotclock.start();
    jest.setSystemTime(now + 1000);
    expect(shotclock.isStarted()).toBe(true);
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.firstShotTime - 1);

    shotclock.pause();
    jest.setSystemTime(now + 2000);
    expect(shotclock.isStarted()).toBe(false);
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.firstShotTime - 1);

    shotclock.start();
    jest.setSystemTime(now + 3000);
    expect(shotclock.isStarted()).toBe(true);
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.firstShotTime - 2);
});

test('new shot', () => {
    const shotclock = new Shotclock();

    shotclock.newShot();
    expect(shotclock.isStarted()).toBe(false);
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.shotTime);
});


test('new rack', () => {
    const now = Date.now();
    jest.setSystemTime(now);
    const shotclock = new Shotclock();

    shotclock.start();
    jest.setSystemTime(now + 1000);
    expect(shotclock.isStarted()).toBe(true);
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.firstShotTime - 1);

    shotclock.newRack();
    expect(shotclock.isStarted()).toBe(false);
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.firstShotTime);
});

test('extensions', () => {
    const now = Date.now();
    jest.setSystemTime(now);
    const shotclock = new Shotclock();

    // initial state
    shotclock.newShot();
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.shotTime);
    expect(shotclock.hasExtension(Player.Guest)).toBe(true);
    expect(shotclock.hasExtension(Player.Home)).toBe(true);

    // guest take's extension
    shotclock.useExtension(Player.Guest);
    expect(shotclock.hasExtension(Player.Guest)).toBe(false);
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.shotTime + defaultConfig.extensionTime);

    // guest take's extension again
    expect(() => shotclock.useExtension(Player.Guest)).toThrowError('Player already used extension');

    // reset after each rack
    shotclock.newRack();
    expect(shotclock.hasExtension(Player.Guest)).toBe(true);
    expect(shotclock.hasExtension(Player.Home)).toBe(true);
});

test('set remaining time', () => {
    const now = Date.now();
    jest.setSystemTime(now);
    const shotclock = new Shotclock();

    shotclock.start();
    jest.setSystemTime(now + 2000);
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.firstShotTime - 2);

    shotclock.setRemainingTime(shotclock.getRemainingTime() + 1);
    expect(shotclock.getRemainingTime()).toBe(defaultConfig.firstShotTime - 1);
});
