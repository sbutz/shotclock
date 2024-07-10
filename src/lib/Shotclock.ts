import { Config, defaultConfig } from "./ShotclockConfig";
import { Timer } from "./Timer";

export enum Player {
    Guest = 'Guest',
    Home = 'Home'
}

export interface IReadonlyShotclock {
    isStarted(): boolean;
    getRemainingTime(): number;
    hasExtension(player: Player): boolean;
    getConfig(): Config;
}

export interface IShotclock extends IReadonlyShotclock {
    newRack(): void;
    newShot(): void;
    start(): void;
    pause(): void;
    setRemainingTime(seconds: number): void;
    useExtension(player: Player): void;
    setConfig(config: Config): void;
}

export class Shotclock implements IShotclock {
    private config: Config;
    private timer: Timer;
    private extensions: Set<Player>;

    constructor(
        config: Config = defaultConfig,
        timer: Timer = new Timer(config.getFirstShotTime()),
        extensions: Set<Player> = new Set([Player.Guest, Player.Home])
    ) {
        this.config = config;
        this.timer = timer;
        this.extensions = extensions;
    }

    public newRack(): void {
        this.timer = new Timer(this.config.getFirstShotTime());
        this.extensions = new Set([Player.Guest, Player.Home]);
    }

    public newShot(): void {
        this.timer = new Timer(this.config.getShotTime());
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
        const wasRunning = this.timer.isStarted();
        this.timer = new Timer(this.timer.getRemainingTime() + this.config.getExtensionTime());
        if (wasRunning) {
            this.timer.start();
        }
    }

    public getConfig(): Config {
        return this.config;
    }

    public setConfig(config: Config): void {
        this.config = config;
        this.newRack();
    }

    public toObject() : any {
        return {
            config: this.config.toObject(),
            timer: this.timer.toObject(),
            extensions: Array.from(this.extensions),
        };
    }
};