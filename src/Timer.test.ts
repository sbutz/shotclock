import { Timer } from './Timer';
import {expect, jest, test} from '@jest/globals';

jest.useFakeTimers();

const timeLimit = 10;

test('initial state', () => {
    const timer = new Timer(timeLimit);

    expect(timer.isStarted()).toBe(false);
    expect(timer.getRemainingTime()).toBe(timeLimit);
});

test('start / stop', () => {
    const timer = new Timer(timeLimit);

    timer.start();
    expect(timer.isStarted()).toBe(true);

    timer.pause();
    expect(timer.isStarted()).toBe(false);
});

test('start / reset', () => {
    const timer = new Timer(timeLimit);

    timer.start();
    expect(timer.isStarted()).toBe(true);

    timer.reset();
    expect(timer.isStarted()).toBe(false);
    expect(timer.getRemainingTime()).toBe(timeLimit);
});

test('get remaining time', () => {
    const timer = new Timer(timeLimit);

    const now = Date.now();
    jest.setSystemTime(now);

    timer.start();
    expect(timer.isStarted()).toBe(true);
    expect(timer.getRemainingTime()).toBe(timeLimit);

    jest.setSystemTime(now + 3000);
    expect(timer.getRemainingTime()).toBe(timeLimit - 3);

    jest.setSystemTime(now + timeLimit * 1000);
    expect(timer.getRemainingTime()).toBe(0);

    jest.setSystemTime(now + timeLimit * 1000 + 3000);
    expect(timer.getRemainingTime()).toBe(0);
});

test('get remaining time after pause', () => {
    const timer = new Timer(timeLimit);

    const now = Date.now();
    jest.setSystemTime(now);

    timer.start();
    expect(timer.getRemainingTime()).toBe(timeLimit);

    timer.pause();
    expect(timer.getRemainingTime()).toBe(timeLimit);

    jest.setSystemTime(now + 3000);
    expect(timer.getRemainingTime()).toBe(timeLimit);

    timer.start();
    jest.setSystemTime(now + 6000);
    expect(timer.getRemainingTime()).toBe(timeLimit - 3);
});