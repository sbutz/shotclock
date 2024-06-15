import { Timer } from "./Timer";

export enum Player {
    Guest = 'Guest',
    Home = 'Home'
}

export interface IShotclock {
    newRack(): void;
    newShot(): void;
    isStarted(): boolean;
    start(): void;
    pause(): void;
    getRemainingTime(): number;
    setRemainingTime(seconds: number): void;
    hasExtension(player: Player): boolean;
    useExtension(player: Player): void;
}

export interface Config {
    shotTime: number;
    extensionTime: number;
    firstShotTime: number;
}
export const defaultConfig: Config = {
    shotTime: 30,
    extensionTime: 30,
    firstShotTime: 60,
};

export class Shotclock implements IShotclock {
    private config: Config;
    private timer: Timer;
    private extensions: Set<Player>;

    constructor(
        config: Config = defaultConfig,
        timer: Timer = new Timer(config.firstShotTime),
        extensions: Set<Player> = new Set([Player.Guest, Player.Home])
    ) {
        this.config = config;
        this.timer = timer;
        this.extensions = extensions;
    }

    public newRack(): void {
        this.timer = new Timer(this.config.firstShotTime);
        this.extensions = new Set([Player.Guest, Player.Home]);
    }

    public newShot(): void {
        this.timer = new Timer(this.config.shotTime);
    }

    public isStarted(): boolean {
        return this.timer.isStarted();
    }

    public start(): void {
        this.timer.start();
    }

    public pause(): void {
        this.timer.pause();
    }

    public getRemainingTime(): number {
        return this.timer.getRemainingTime();
    }

    public setRemainingTime(seconds: number): void {
        if (seconds < 0) {
            throw new Error('Invalid time');
        }
        this.timer = new Timer(seconds);
    }

    public hasExtension(player: Player): boolean {
        return this.extensions.has(player);
    }

    public useExtension(player: Player): void {
        if (!this.hasExtension(player)) {
            throw new Error('Player already used extension');
        }
        this.extensions.delete(player);
        this.timer = new Timer(this.timer.getRemainingTime() + this.config.extensionTime);
    }

    public toObject() : any {
        return {
            config: this.config,
            timer: this.timer.toObject(),
            extensions: Array.from(this.extensions),
        };
    }
};