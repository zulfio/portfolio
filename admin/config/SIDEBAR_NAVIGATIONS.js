import { XMarkIcon } from "@heroicons/react/20/solid";
import PERMISSIONS from "./PERMISSIONS";
import ROUTES from "./ROUTES";
import {
    HomeIcon,
    DocumentTextIcon,
    UsersIcon,
    Cog6ToothIcon,
    PhotoIcon,
    ChartBarIcon,
    QrCodeIcon,
    DocumentCurrencyDollarIcon,
    InboxStackIcon,
    BookOpenIcon
} from "@heroicons/react/24/outline";

const SIDEBAR_NAVIGATIONS = [
    {
        groupName: "Main Menu",
        items: [
            {
                name: "Dashboard",
                href: ROUTES.DASHBOARD,
                icon: HomeIcon,
                current: false,
            },
        ],
    },
    {
        groupName: "Admin Menu",
        items: [
            {
                name: "Manage Admin",
                href: ROUTES.ADMINS,
                icon: UsersIcon,
                current: false,
                childs: [
                    {
                        name: "All Admins",
                        href: ROUTES.ADMINS,
                        current: false,
                        requiredPermissions: [PERMISSIONS.ADMIN.READ.name],
                    },
                    {
                        name: "Add New",
                        href: ROUTES.CREATE_ADMIN,
                        current: false,
                        requiredPermissions: [PERMISSIONS.ADMIN.CREATE.name],
                    },
                    {
                        name: "Roles",
                        href: ROUTES.ROLES,
                        current: false,
                        requiredPermissions: [PERMISSIONS.ROLE.READ.name],
                    },
                ],
            },
            {
                name: "Site Options",
                href: ROUTES.SITE_OPTIONS,
                icon: Cog6ToothIcon,
                current: false,
                requiredPermissions: [PERMISSIONS.OPTIONS.ALL.name],
            },
        ],
    },
];

export default SIDEBAR_NAVIGATIONS;
