import axios from "axios";
import fs from "fs";
import https from "https";
import { Addon } from "./addon";

export class BiscuitAddon extends Addon {
    public branch: string;

    constructor(repo: string, branch: string) {
        super(repo);
        this.releaseUrl = `https://thebusybiscuit.github.io/builds/${repo}/${branch}/builds.json`;
        this.branch = branch;
    }

    public async resolveJar() {
        const response = await axios.get(this.releaseUrl);
        const data = response.data;
        this.url = `https://thebusybiscuit.github.io/builds/${this.repo}/${
            this.branch
        }/${this.repo.split("/").pop()}-${data.latest}.jar`;
        this.jars[
            `${this.repo.split("/").pop()}-${data.latest}.jar`
        ] = `https://thebusybiscuit.github.io/builds/${this.repo}/${
            this.branch
        }/${this.repo.split("/").pop()}-${data.latest}.jar`;
        return true;
    }

    public downloadIndividual(outputFolder: string, name: string) {
        if (!fs.existsSync(outputFolder))
            fs.mkdirSync(outputFolder, { recursive: true });
        return new Promise((resolve, reject) => {
            https
                .get(this.jars[name], (response) => {
                    const file = fs.createWriteStream(
                        `${outputFolder}/${name}`
                    );
                    response.pipe(file);
                    file.on("finish", () => {
                        this.downloadedJars.push(name);
                        resolve(true);
                    });
                    file.on("error", (error) => {
                        reject(error);
                    });
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }
}
