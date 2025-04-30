import { serveStatic } from "hono/bun";
import { logger as honoLogger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import handleError from "../controllers/handleError";
import authRoutes from "../routes/auth.routes";
import fileManagerRoutes from "../routes/fileManager.routes";
import roleRoutes from "../routes/role.routes";
import adminRoutes from "../routes/admin.routes";
import optionRoutes from "../routes/option.routes";
import assetRoutes from "../routes/asset/asset.routes";
import assetBrandRoutes from "../routes/asset/assetBrand.routes";
import assetCategoryRoutes from "../routes/asset/assetCategory.routes";
import assetLocationRoutes from "../routes/asset/assetLocation.routes";
import assetStoreRoutes from "../routes/asset/assetStore.routes";
import employeeRoutes from "../routes/employee.routes";
import fundingApplicationRoutes from "../routes/fundingApplication.routes";
import distributionProgramRoutes from "../routes/distribution/distributionProgram.routes";
import distributionItemRoutes from "../routes/distribution/distributionItem.routes";
import distributionBeneficiaryRoutes from "../routes/distribution/distributionBeneficiary.routes";
import distributionApplicationRoutes from "../routes/distribution/distributionApplication.routes";

function honoLoader(app) {
    app.use(honoLogger());
    app.use(secureHeaders());

    if (process.env.NODE_ENV === "production") {
        app.use(
            cors({
                origin: [...process.env.CLIENTS_URL.split(",")],
                credentials: true,
            }),
        );
    }

    app.use(
        "/static/*",
        serveStatic({
            root: "./src/public/",
            rewriteRequestPath: (path) => path.replace(/^\/static/, "/uploads"),
        }),
    );

    app.route("/api/v1/auth", authRoutes);
    app.route("/api/v1/fileManager", fileManagerRoutes);
    app.route("/api/v1/role", roleRoutes);
    app.route("/api/v1/admin", adminRoutes);
    app.route("/api/v1/option", optionRoutes);
    app.route("/api/v1/asset", assetRoutes);
    app.route("/api/v1/asset-category", assetCategoryRoutes);
    app.route("/api/v1/asset-brand", assetBrandRoutes);
    app.route("/api/v1/asset-store", assetStoreRoutes);
    app.route("/api/v1/asset-location", assetLocationRoutes);
    app.route("/api/v1/employee", employeeRoutes);
    app.route("/api/v1/funding-application", fundingApplicationRoutes);
    app.route("/api/v1/distribution-program", distributionProgramRoutes);
    app.route("/api/v1/distribution-item", distributionItemRoutes);
    app.route("/api/v1/distribution-beneficiary", distributionBeneficiaryRoutes);
    app.route("/api/v1/distribution-application", distributionApplicationRoutes);

    app.onError(handleError);
}

export default honoLoader;
