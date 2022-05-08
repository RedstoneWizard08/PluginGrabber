import { Addon } from "./addon";
import { MultiProgressBars } from "multi-progress-bars";
import * as chalk from "chalk";
import { ResourcePackAddon } from "./rpaddon";
import { CompiledAddon } from "./compiled";

const errored: {
    project: Addon;
    error: unknown;
}[] = [];

const noFiles: {
    project: Addon;
}[] = [];

export const main = async (projects: Addon[]) => {
    const mpb = new MultiProgressBars({
        initMessage: " Downloading Plugins ",
        anchor: "top",
        persist: true,
        border: true,
    });

    mpb.addTask("Downloading Plugins", {
        type: "percentage",
        barTransformFn: chalk.default.cyan,
        nameTransformFn: chalk.default.yellow,
    });

    mpb.updateTask("Downloading Plugins", {
        percentage: 0,
    });

    console.log(`Downloading ${projects.length} plugins...\n`);

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        mpb.updateTask("Downloading Plugins", {
            message: `Resolving ${project.getRepo()}...`,
        });

        try {
            await project.resolveJar();
        } catch (e) {
            console.log(`Failed to resolve ${project.getRepo()}.`);

            errored.push({
                project,
                error: e,
            });

            continue;
        }

        mpb.updateTask("Downloading Plugins", {
            message: `${
                project instanceof CompiledAddon ? "Compiling" : "Downloading"
            } ${project.getRepo()}...`,
        });

        try {
            if (project instanceof ResourcePackAddon) {
                await project.download("out/resourcepacks");
            } else if (project instanceof CompiledAddon) {
                await project.compile("out/plugins", "out/compiled");
            } else {
                await (project as Addon).download("out/plugins");
            }

            if (project.getDownloadedJars().length == 0) {
                noFiles.push({
                    project,
                });
            }
        } catch (e) {
            console.log(
                `Failed to ${
                    project instanceof CompiledAddon ? "compile" : "download"
                } ${project.getRepo()}.`
            );

            errored.push({
                project,
                error: e,
            });

            continue;
        }

        const percentComplete = ((100 * (i + 1)) / projects.length) * 0.01;
        mpb.updateTask("Downloading Plugins", { percentage: percentComplete });

        console.log(
            `Downloaded ${
                project.getDownloadedJars().length
            } files for ${project.getRepo()}.`
        );
    }

    console.log("");

    if (errored.length == 0) {
        console.log("All projects were downloaded successfully!");
        let downloaded = 0;
        for (const project of projects) {
            downloaded += project.getDownloadedJars().length;
        }
        console.log(`${downloaded} jars were downloaded!`);
    } else {
        console.log(`${errored.length} projects failed to download!`);
        for (const error of errored) {
            console.log(
                `${error.project.getRepo()} failed with ${error.error}`
            );
        }
    }

    if (noFiles.length > 0) {
        console.log(`${noFiles.length} projects had no files downloaded!`);
        for (const project of noFiles) {
            console.log(
                `${project.project.getRepo()} had no files downloaded!`
            );
        }
    }

    mpb.done("Downloading Plugins");

    await mpb.promise;
};
