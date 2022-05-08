import axios from "axios";
import fs from "fs";
import https from "https";

export class Addon {
    public repo: string;
    public url: string;
    public releaseUrl: string;
    public jars: { [key: string]: string };
    public downloadedJars: string[] = [];
    public token: string | undefined;

    constructor(repo: string, token?: string) {
        this.repo = repo;
        this.releaseUrl = `https://api.github.com/repos/${repo}/releases/latest`;
        this.url = "";
        this.jars = {};
        this.token = token;
    }

    public async resolveJar() {
        const response = await axios.get(this.releaseUrl, {
            auth: {
                username: this.token?.split(":")[0] || "",
                password: this.token?.split(":")[1] || "",
            },
        });
        const data = response.data;
        const assets = data.assets_url;
        const assetsResponse = await axios.get(assets, {
            auth: {
                username: this.token?.split(":")[0] || "",
                password: this.token?.split(":")[1] || "",
            },
        });
        const assetsData = assetsResponse.data;
        for (let i = 0; i < assetsData.length; i++) {
            const asset = assetsData[i];
            if (asset.name.endsWith(".jar")) {
                this.jars[asset.name] = asset.url;
            }
        }
        return true;
    }

    public downloadIndividual(outputFolder: string, name: string) {
        if (!fs.existsSync(outputFolder))
            fs.mkdirSync(outputFolder, { recursive: true });
        return new Promise((resolve, reject) => {
            https
                .get(
                    this.jars[name],
                    {
                        headers: {
                            authorization: `Basic ${btoa(this.token || "")}`,
                        },
                    },
                    (response) => {
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
                    }
                )
                .on("error", (error) => {
                    reject(error);
                });
        });
    }

    public async download(outputFolder: string) {
        for (const name of Object.keys(this.jars)) {
            await this.downloadIndividual(outputFolder, name);
        }
        return true;
    }

    public getJar() {
        return this.jars[0];
    }

    public getRepo() {
        return this.repo;
    }

    public getDownloadedJars() {
        return this.downloadedJars;
    }
}
