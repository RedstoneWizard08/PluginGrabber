import axios from "axios";
import { Addon } from "./addon";

export class MultiAddon extends Addon {
    constructor(repo: string, token?: string) {
        super(repo, token);
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
                if (this.hasSpigotJar(assetsData) === true) {
                    if (
                        asset.name.toLowerCase().includes("spigot") ||
                        asset.name.toLowerCase().includes("paper") ||
                        asset.name.toLowerCase().includes("bukkit")
                    ) {
                        this.jars[asset.name] = asset.url;
                    }
                }
            }
        }
        return true;
    }

    public hasSpigotJar(data: { name: string }[]) {
        if (data.length == 1) return false;
        for (const jar of data) {
            if (
                jar.name.toLowerCase().includes("spigot") ||
                jar.name.toLowerCase().includes("paper") ||
                jar.name.toLowerCase().includes("bukkit")
            ) {
                return true;
            }
        }
        return false;
    }
}
