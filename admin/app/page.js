import ROUTES from "@/config/ROUTES";
import { redirect } from "next/navigation";

export default function AssetHomePage() {
    redirect(ROUTES.ASSETS);
}
