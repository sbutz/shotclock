const initialTime = 0;

export class Timer {
    private timeLimit: number;
    private startTime: number;
    private remainingTimeOnPause: number;

    constructor(timeLimit: number) {
        this.timeLimit = timeLimit;
        this.startTime = initialTime;
        this.remainingTimeOnPause = timeLimit;
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
            const elapsedTime = (Date.now() - this.startTime) / 1000;
            return Math.max(0, this.remainingTimeOnPause - elapsedTime);
        }
    }
};