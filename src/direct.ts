import { Addon } from "./addon";

export class DirectAddon extends Addon {
    public url: string;
    public file: string;

    constructor(url: string) {
        super(
            url.split("/").pop()?.split("?").shift() ||
                url.replace(/(?:\/|:)/gm, "_")
        );
        this.url = url;
        this.file =
            url.split("/").pop()?.split("?").shift() ||
            url.replace(/(?:\/|:)/gm, "_");
    }

    public async resolveJar() {
        this.jars[this.file] = this.url;
        return true;
    }
}
