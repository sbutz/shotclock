const initialTime = 0;

export class Timer {
    private timeLimit: number;
    private startTime: number;
    private remainingTimeOnPause: number;
    private static serverTimeOffset = 0;

    constructor(timeLimit: number, startTime: number = initialTime, remainingTimeOnPause: number = timeLimit) {
        this.timeLimit = timeLimit;
        this.startTime = startTime;
        this.remainingTimeOnPause = remainingTimeOnPause;
    }

    public reset(): void {
        this.startTime = initialTime;
        this.remainingTimeOnPause = this.timeLimit;
    }

    public start(): void {
        this.startTime = Date.now();
    }

    public isStarted(): boolean {
        return this.startTime !== initialTime;
    }

    public pause(): void {
        this.remainingTimeOnPause = this.getRemainingTime();
        this.startTime = initialTime;
    }

    public getRemainingTime(): number {
        if (this.startTime === initialTime) {
            return this.remainingTimeOnPause;
        } else {
            const elapsedTime = (Date.now() + Timer.serverTimeOffset - this.startTime) / 1000;
            return Math.max(0, this.remainingTimeOnPause - elapsedTime);
        }
    }

    public toObject(): any {
        return {
            timeLimit: this.timeLimit,
            startTime: this.startTime,
            remainingTimeOnPause: this.remainingTimeOnPause,
        };
    }

    public static setServerTimeOffset(offset: number): void {
        Timer.serverTimeOffset = offset;
    }
};