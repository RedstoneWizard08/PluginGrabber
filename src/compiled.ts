import * as cp from "child_process";
import fs from "fs";
import path from "path";
import { Addon } from "./addon";

export class CompiledAddon extends Addon {
    public jarOutput: string;
    public repoName: string;

    constructor(repo: string, jarOut: string, token?: string) {
        super(repo, token);
        this.jarOutput = jarOut;
        this.repoName = repo.split("/").pop() || repo.replaceAll("/", "_");
    }

    public async resolveJar() {
        this.jars[this.repoName] = this.repoName;
        return true;
    }

    public compileIndividual(
        outputFolder: string,
        compileDir: string,
        name: string
    ) {
        if (!fs.existsSync(outputFolder))
            fs.mkdirSync(outputFolder, { recursive: true });

        if (!fs.existsSync(compileDir))
            fs.mkdirSync(compileDir, { recursive: true });

        return new Promise((resolve) => {
            if (fs.existsSync(`${compileDir}/${name}/${this.jarOutput}`)) {
                fs.copyFileSync(
                    `${compileDir}/${name}/${this.jarOutput}`,
                    `${outputFolder}/${this.jarOutput.split("/").pop()}`
                );

                this.downloadedJars.push(
                    this.jarOutput.split("/").pop() || name
                );

                return resolve(true);
            }

            if (!fs.existsSync(`${path.resolve(compileDir)}/${name}`))
                cp.execSync(
                    `git clone --recursive https://github.com/${
                        this.repo
                    } ${path.resolve(compileDir)}/${name}`,
                    {
                        stdio: "inherit",
                    }
                );

            let isGradle = true;

            if (fs.existsSync(`${path.resolve(compileDir)}/${name}/pom.xml`))
                isGradle = false;

            if (!isGradle) {
                cp.execSync(
                    `cd ${path.resolve(compileDir)}/${name} && mvn package`,
                    {
                        stdio: "inherit",
                    }
                );
            } else {
                cp.execSync(`cd ${compileDir}/${name} && ./gradlew build`, {
                    stdio: "inherit",
                });
            }

            fs.copyFileSync(
                `${compileDir}/${name}/${this.jarOutput}`,
                `${outputFolder}/${this.jarOutput.split("/").pop()}`
            );

            this.downloadedJars.push(this.jarOutput.split("/").pop() || name);

            resolve(true);
        });
    }

    public async compile(outputFolder: string, compileDir: string) {
        for (const name of Object.keys(this.jars)) {
            await this.compileIndividual(outputFolder, compileDir, name);
        }
        return true;
    }
}
