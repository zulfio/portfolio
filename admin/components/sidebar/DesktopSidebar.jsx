"use client";

import React, { useCallback, useEffect, useState } from "react";
import Item from "./Item";
import MobileSidebar from "./MobileSidebar";
import { usePathname } from "next/navigation";
import hasRequiredPermissions from "@/lib/utils/auth/hasRequiredPermissions";
import SIDEBAR_NAVIGATIONS from "@/config/SIDEBAR_NAVIGATIONS";

function Sidebar({ sidebarOpen, setSidebarOpen, session }) {
    const pathname = usePathname();

    const [navigations, setNavigations] = useState([]);

    /**
     * Builds the navigations for the sidebar.
     * Sets the current navigation based on the current URL and filters the navigations based on the user's permissions.
     *
     * @param {string} href - The current URL.
     */
    const buildNavigations = useCallback(
        (href) => {
            const userPermissions = session.user.role?.permissions || [];

            const newNavigations = SIDEBAR_NAVIGATIONS.filter((navigation) => {
                const newItems = navigation.items.filter((item) => {
                    let hasPermission = false;

                    item.current = item.href === href;
                    if (item.childs) {
                        item.childs = item.childs.filter((child) => {
                            if (!hasRequiredPermissions(userPermissions, child.requiredPermissions)) {
                                return false;
                            }

                            child.current = child.href === href;

                            hasPermission = true;
                            return true;
                        });
                    }

                    return item.childs
                        ? hasPermission
                        : hasRequiredPermissions(userPermissions, item.requiredPermissions);
                });

                navigation.items = newItems;

                return navigation.items.length > 0;
            });

            setNavigations(newNavigations);
        },
        [session],
    );

    useEffect(() => {
        buildNavigations(pathname);
    }, [pathname, buildNavigations]);

    return (
        <>
            <MobileSidebar
                session={session}
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
                navigations={navigations}
            />
            <div className="fixed -left-60 lg:inset-y-0 lg:left-0 lg:z-20 lg:flex lg:w-60 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200 bg-white px-6 pb-4 pt-16 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                    <nav className="flex flex-1 flex-col pt-5">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            {navigations.map((navigation) => (
                                <li key={navigation.groupName}>
                                    <div className="text-xs font-extrabold leading-6 text-slate-700">
                                        {navigation.groupName}
                                    </div>
                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                        {navigation.items.map((navItem) => {
                                            return (
                                                <Item
                                                    item={navItem}
                                                    key={navItem.name}
                                                    userPermissions={session.user.role?.permissions}
                                                />
                                            );
                                        })}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
