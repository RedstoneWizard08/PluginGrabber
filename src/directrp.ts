import { Addon } from "./addon";

export class DirectResourcePackAddon extends Addon {
    public url: string;
    public file: string;

    constructor(url: string, token?: string) {
        super(url.split("/").pop() || url.replace(/(?:\/|:)/gm, "_"), token);
        this.url = url;
        this.file = url.split("/").pop() || url.replace(/(?:\/|:)/gm, "_");
    }

    public async resolveJar() {
        this.jars[this.file] = this.url;
        return true;
    }
}
