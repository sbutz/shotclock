export class Config {
    private shotTime: number;
    private extensionTime: number;
    private firstShotTime: number;

    constructor(
        shotTime: number,
        extensionTime: number,
        firstShotTime: number,
    ) {
        this.shotTime = shotTime;
        this.extensionTime = extensionTime;
        this.firstShotTime = firstShotTime;
    }

    public getShotTime() : number {
        return this.shotTime;
    }

    public getExtensionTime() : number {
        return this.extensionTime;
    }

    public getFirstShotTime() : number {
        return this.firstShotTime;
    }

    public equals(other: Config) : boolean {
        return this.shotTime === other.shotTime
            && this.extensionTime === other.extensionTime
            && this.firstShotTime === other.firstShotTime;
    }

    public toObject() : any {
        return {
            shotTime: this.shotTime,
            extensionTime: this.extensionTime,
            firstShotTime: this.firstShotTime,
        };
    }
}

export const matchroomConfig = new Config(30, 30, 60);
export const dbuConfig = new Config(35, 25, 60);
export const defaultConfig = matchroomConfig;