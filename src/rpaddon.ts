import axios from "axios";
import { Addon } from "./addon";

export class ResourcePackAddon extends Addon {
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
            if (asset.name.endsWith(".zip")) {
                this.jars[asset.name] = asset.url;
            }
        }
        return true;
    }
}
