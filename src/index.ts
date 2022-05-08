import fs from "fs";
import dotenv from "dotenv";
import { Addon } from "./addon";
import { BiscuitAddon } from "./biscuitaddon";
import { DirectAddon } from "./direct";
import { main } from "./main";
import { MultiAddon } from "./multiaddon";
import { ResourcePackAddon } from "./rpaddon";

const token = dotenv.config().parsed?.TOKEN;

const projects = [
    // Slimefun
    new BiscuitAddon("TheBusyBiscuit/Slimefun4", "master"),

    // Slimefun Addons from TheBusyBiscuit
    new BiscuitAddon("Slimefun-Addon-Community/Galactifun", "master"),
    new BiscuitAddon("Slimefun/SensibleToolbox", "master"),
    new BiscuitAddon("TheBusyBiscuit/ExoticGarden", "master"),
    new BiscuitAddon("TheBusyBiscuit/ColoredEnderChests", "master"),
    new BiscuitAddon("TheBusyBiscuit/HotbarPets", "master"),
    new BiscuitAddon("TheBusyBiscuit/SoulJars", "master"),
    new BiscuitAddon("TheBusyBiscuit/ElectricSpawners", "master"),
    new BiscuitAddon("TheBusyBiscuit/PrivateStorage", "master"),
    new BiscuitAddon("TheBusyBiscuit/ChestTerminal", "master"),
    new BiscuitAddon("TheBusyBiscuit/ExtraGear", "master"),
    new BiscuitAddon("TheBusyBiscuit/ExtraHeads", "master"),
    new BiscuitAddon("TheBusyBiscuit/SlimefunOreChunks", "master"),
    new BiscuitAddon("TheBusyBiscuit/DyedBackpacks", "master"),
    new BiscuitAddon("TheBusyBiscuit/SlimyTreeTaps", "master"),
    new BiscuitAddon("TheBusyBiscuit/MobCapturer", "master"),
    new BiscuitAddon("J3fftw1/LiteXpansion", "master"),
    new BiscuitAddon("TheBusyBiscuit/EcoPower", "master"),
    new BiscuitAddon("J3fftw1/SoundMuffler", "master"),
    new BiscuitAddon("Sfiguz7/ExtraTools", "master"),
    new BiscuitAddon("Sfiguz7/TranscEndence", "master"),
    new BiscuitAddon("Seggan/EMC2", "master"),
    new BiscuitAddon("Seggan/Liquid", "master"),
    new BiscuitAddon("Seggan/SFCalc", "master"),
    new BiscuitAddon("Seggan/SlimefunWarfare", "master"),
    new BiscuitAddon("NCBPFluffyBear/FlowerPower", "master"),
    new BiscuitAddon("NCBPFluffyBear/FluffyMachines", "master"),
    new BiscuitAddon("NCBPFluffyBear/SlimeCustomizer", "master"),
    new BiscuitAddon("NCBPFluffyBear/SlimyRepair", "master"),
    new BiscuitAddon("Mooy1/InfinityExpansion", "master"),
    new BiscuitAddon("Mooy1/SimpleUtils", "master"),
    new BiscuitAddon("GallowsDove/FoxyMachines", "master"),
    new BiscuitAddon("poma123/GlobalWarming", "master"),
    new BiscuitAddon("ProfElements/DynaTech", "master"),
    new BiscuitAddon("kii-chan-reloaded/GeneticChickengineering", "master"),
    new BiscuitAddon("J3fftw1/HeadLimiter", "master"),
    new BiscuitAddon("J3fftw1/LuckyPandas", "master"),
    new BiscuitAddon("Apeiros-46B/AlchimiaVitae", "master"),
    new BiscuitAddon("Apeiros-46B/VillagerUtil", "main"),
    new BiscuitAddon("Sefiraat/CrystamaeHistoria", "master"),
    new BiscuitAddon("Sefiraat/DankTech2", "master"),
    new BiscuitAddon("Sefiraat/EquivalencyTech", "master"),
    new BiscuitAddon("Sefiraat/Networks", "master"),
    new BiscuitAddon("Sefiraat/Simple-Storage", "master"),
    new BiscuitAddon("Sefiraat/SlimeTinker", "master"),
    new BiscuitAddon("Sefiraat/SMG", "master"),
    new BiscuitAddon("WalshyDev/SFMobDrops", "main"),
    new BiscuitAddon("EpicPlayerA10/PotionExpansion", "master"),
    new BiscuitAddon("FN-FAL113/SfChunkInfo", "main"),
    new BiscuitAddon("FN-FAL113/FN-FAL-s-Amplifications", "main"),
    new BiscuitAddon("lucasGithuber/Element-Manipulation", "master"),
    new BiscuitAddon("qwertyuioplkjhgfd/SlimefunAdvancements", "main"),
    new BiscuitAddon("TheSilentPro/SlimeBot", "master"),
    new BiscuitAddon("RelativoBR/SupremeExpansion", "main"),
    new BiscuitAddon("LinoxGH/MoreTools", "build"),
    new BiscuitAddon("TheBusyBiscuit/ChestTerminal", "master"),

    // Slimefun Addons from GitHub
    new Addon("koiboi-dev/MissileWarfare", token),
    new Addon("DieReicheErethons/Brewery", token),
    new Addon("steve4744/WhatIsThis", token),
    new Addon("TweepCoding/hohenheim", token),
    new Addon("nahkd123/Endrex", token),
    new Addon("TweepCoding/New-Begginings", token),
    new Addon("Gavin296/slimestack", token),
    new Addon("Mooy1/BloodAlchemy", token),

    // Craftory
    new Addon("CraftoryStudios/Craftory-Tech", token),

    // Craftory Addons
    new Addon("BlackBeltPanda/Transport-Pipes", token),
    new Addon("Qveshn/LightAPI", token),

    // Nova
    new Addon("xenondevs/Nova", token),

    // Others
    new Addon("timbru31/SilkSpawners", token),
    new Addon("milkbowl/Vault", token),
    new Addon("EssentialsX/Essentials", token),
    new Addon("jikoo/OpenInv", token),
    new Addon("PlayPro/CoreProtect", token),
    new Addon("endercrest/VoidSpawn", token),
    new Addon("ChestShop-authors/ChestShop-3", token),
    new Addon("8ortiz4/teleport-2022", token),
    new Addon("wargamer/SignShop", token),
    new Addon("Aurilisdev/Timber", token),
    new Addon("sgtcaze/NametagEdit", token),
    new Addon("Geolykt/EnchantmentsPlus", token),
    new Addon("ChestsPlusPlus/ChestsPlusPlus", token),
    new Addon("lemonypancakes/origins-bukkit", token),
    new Addon("iLucaH/AdvancedArmor", token),
    new Addon("sarhatabaot/EnchantGUI", token),
    new Addon("spnda/BlockProt", token),
    new Addon("dmulloy2/ProtocolLib", token),

    // Multiple Platform Addons
    new MultiAddon("2008Choco/VeinMiner", token),
    new MultiAddon("webbukkit/dynmap", token),

    // Direct Plugins
    new DirectAddon(
        "https://ci.athion.net/job/FastAsyncWorldEdit/168/artifact/artifacts/FastAsyncWorldEdit-Bukkit-2.1.3-SNAPSHOT-168.jar"
    ),
    new DirectAddon(
        "https://edge.forgecdn.net/files/3759/64/FastAsyncVoxelSniper-2.3.1.jar"
    ),
    new DirectAddon(
        "https://ci.enginehub.org/repository/download/bt12/17332:id/commandhelper-3.3.4-SNAPSHOT-full.jar?branch=master&guest=1"
    ),
    new DirectAddon(
        "https://ci.enginehub.org/repository/download/bt6/19821:id/craftbook-3.10.7-SNAPSHOT-dist.jar?branch=master&guest=1"
    ),
    new DirectAddon(
        "https://ci.enginehub.org/repository/download/bt9/19536:id/commandbook-3.0-SNAPSHOT-dist.jar?branch=master&guest=1"
    ),
    new DirectAddon("https://edge.forgecdn.net/files/3708/62/PowerRanks.jar"),
    new DirectAddon(
        "https://ci.lucko.me/job/LuckPerms/1429/artifact/bukkit/loader/build/libs/LuckPerms-Bukkit-5.4.21.jar"
    ),

    // Resource Packs
    new ResourcePackAddon("xenondevs/NovaRP", token),
];

fs.rmSync("out", { recursive: true });
main(projects);
