import chalk from "chalk";
import mongoose from "mongoose";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { EJSON } from 'bson';

import Admin from "../models/Auth/Admin";
import Role from "../models/Auth/Role";
import SiteOption from "../models/SiteOption";


import roles from "./data/roles.json";
import admins from "./data/admins.json";
import site_options from "./data/site_options.json";
import assets from "./data/assets.json";
import asset_brands from "./data/asset_brands.json";
import asset_categories from "./data/asset_categories.json";
import asset_locations from "./data/asset_locations.json";
import asset_stores from "./data/asset_stores.json";
import employees from "./data/employees.json";
import media from "./data/media.json";
import funding_applications from "./data/funding_applications.json"

let DB_URL = "mongodb://mongo:27017/crowdfundingapp";
let SEED_TYPES = [];

async function confirm() {
    const answer = await inquirer.prompt({
        name: "continue",
        type: "list",
        message: "Are you sure you want to continue?",
        choices: ["Yes", "No"],
    });

    if (answer.continue !== "Yes") {
        console.log(chalk.yellow("Database seeding aborted."));
        process.exit(0);
    }
}

async function askDatabaseUrl() {
    const answer = await inquirer.prompt({
        name: "dbUrl",
        type: "input",
        message: "Enter the mongodb database URI: (default is mongodb://mongo:27017/crowdfundingapp)",
    });

    DB_URL = answer.dbUrl || DB_URL;
}

async function askSeedType() {
    const answer = await inquirer.prompt({
        name: "seedType",
        type: "checkbox",
        message: "What do you want to seed?",
        choices: ["all", "admins", "roles", "site options", "assets", "asset brands", "asset categories", "asset locations", "asset stores", "employees", "media", "funding applications"]
    });

    SEED_TYPES = answer.seedType;
}

async function seedAdmins() {
    const spinner = createSpinner("Seeding admins...").start();

    try {
        await Admin.deleteMany({});
        await Admin.insertMany(EJSON.deserialize(admins));
        spinner.success({ text: "Admins seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding admins: ${error.message} ${error.stack}` });
    }
}

async function seedRoles() {
    const spinner = createSpinner("Seeding roles...").start();

    try {
        await Role.deleteMany({});
        await Role.insertMany(EJSON.deserialize(roles));

        spinner.success({ text: "Roles seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding roles: ${error.message} ${error.stack}` });
    }
}

async function seedSiteOptions() {
    const spinner = createSpinner("Seeding site options...").start();

    try {
        await SiteOption.deleteMany({});
        await SiteOption.insertMany(EJSON.deserialize(site_options));

        spinner.success({ text: "Site options seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding site options: ${error.message} ${error.stack}` });
    }
}

async function seedAssets() {
    const spinner = createSpinner("Seeding assets...").start();

    try {
        await Asset.deleteMany({});
        await Asset.insertMany(EJSON.deserialize(assets));

        spinner.success({ text: "Assets seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding assets: ${error.message} ${error.stack}` });
    }
}

async function seedAssetBrands() {
    const spinner = createSpinner("Seeding asset brands...").start();

    try {
        await AssetBrand.deleteMany({});
        await AssetBrand.insertMany(EJSON.deserialize(asset_brands));

        spinner.success({ text: "Asset brands seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding asset brands: ${error.message} ${error.stack}` });
    }
}

async function seedAssetCategories() {
    const spinner = createSpinner("Seeding asset categories...").start();

    try {
        await AssetCategory.deleteMany({});
        await AssetCategory.insertMany(EJSON.deserialize(asset_categories));

        spinner.success({ text: "Asset categories seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding asset categories: ${error.message} ${error.stack}` });
    }
}

async function seedAssetLocations() {
    const spinner = createSpinner("Seeding asset locations...").start();

    try {
        await AssetLocation.deleteMany({});
        await AssetLocation.insertMany(EJSON.deserialize(asset_locations));

        spinner.success({ text: "Asset locations seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding asset locations: ${error.message} ${error.stack}` });
    }
}

async function seedAssetStores() {
    const spinner = createSpinner("Seeding asset stores...").start();

    try {
        await AssetStore.deleteMany({});
        await AssetStore.insertMany(EJSON.deserialize(asset_stores));

        spinner.success({ text: "Asset stores seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding asset stores: ${error.message} ${error.stack}` });
    }
}

async function seedEmployees() {
    const spinner = createSpinner("Seeding employees...").start();

    try {
        await Employee.deleteMany({});
        await Employee.insertMany(EJSON.deserialize(employees));

        spinner.success({ text: "Employees seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding employees: ${error.message} ${error.stack}` });
    }
}

async function seedMedia() {
    const spinner = createSpinner("Seeding media...").start();

    try {
        await Media.deleteMany({});
        await Media.insertMany(EJSON.deserialize(media));

        spinner.success({ text: "Media seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding media: ${error.message} ${error.stack}` });
    }
}

async function seedFundingApplications() {
    const spinner = createSpinner("Seeding funding applications...").start();

    try {
        await FundingApplication.deleteMany({});
        await FundingApplication.insertMany(EJSON.deserialize(funding_applications));

        spinner.success({ text: "Funding applications seeded successfully" });
    } catch (error) {
        spinner.error({ text: `Error occurred while seeding funding applications: ${error.message} ${error.stack}` });
    }
}

async function seed() {
    try {
        console.log(chalk.yellow(`Starting database seeding process. Database URL: ${DB_URL}`));

        await mongoose.connect(DB_URL, {
            autoIndex: true,
        });
        console.log(chalk.green("Database connection established successfully."));

        for (const seedType of SEED_TYPES) {
            switch (seedType) {
                case "admins":
                    await seedAdmins();
                    break;
                case "roles":
                    await seedRoles();
                    break;
                case "site options":
                    await seedSiteOptions();
                    break;
                case "assets":
                    await seedAssets();
                    break;
                case "asset brands":
                    await seedAssetBrands();
                    break;
                case "asset categories":
                    await seedAssetCategories();
                    break;
                case "asset locations":
                    await seedAssetLocations();
                    break;
                case "asset stores":
                    await seedAssetStores();
                    break;
                case "employees":
                    await seedEmployees();
                    break;
                case "media":
                    await seedMedia();
                    break;
                case "funding applications":
                    await seedFundingApplications();
                    break;
                case "all":
                    await seedAdmins();
                    await seedRoles();
                    await seedSiteOptions();
                    await seedAssets();
                    await seedAssetBrands();
                    await seedAssetCategories();
                    await seedAssetLocations();
                    await seedAssetStores();
                    await seedEmployees();
                    await seedMedia();
                    await seedFundingApplications();
                    break;
                default:
                    console.log(chalk.red("Invalid seed type."));
                    process.exit(1);
            }
        }

        await mongoose.connection.close();
        console.log(chalk.green("Database seeding completed successfully."));
    } catch (error) {
        console.error(chalk.red("Error occurred while seeding database: ", error));
        process.exit(1);
    }
}

console.log(chalk.red("WARNING: THIS ACTION WILL DELETE ALL EXISTING DATA IN THE DATABASE."));
await confirm();
await askDatabaseUrl();
await askSeedType();
await seed();

process.exit(0);
