import { Dialog, Transition } from "@headlessui/react";
import { Fragment, } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Item from "./Item";
import { useOptions } from "@/lib/hooks/siteOptions.hook";

function SiteLogo({ isPending, path }) {
    if (isPending) {
        return (
            <div className="h-7 w-40 bg-gray-200 animate-pulse" />
        );
    }

    return path ? (
        <Image
            src={`${process.env.NEXT_PUBLIC_STATIC_PATH}/${path}`}
            alt="Logo"
            width={135}
            height={40}
            priority={true}
            className="mx-auto"
        />
    ) : (
        <div className="h-16 w-40 bg-gray-200" />
    );
}

function MobileSidebar({ sidebarOpen, setSidebarOpen, navigations }) {
    const { data, isPending } = useOptions();


    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button
                                        type="button"
                                        className="-m-2.5 p-2.5"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <div className="mt-7">
                                    <SiteLogo isPending={isPending} path={data?.site_logo} />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        {navigations.map((navigation) => (
                                            <li key={navigation.groupName}>
                                                <div className="text-xs font-semibold leading-6 text-slate-400">
                                                    {navigation.groupName}
                                                </div>
                                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                    {navigation.items.map((navItem) => {
                                                        return <Item item={navItem} key={navItem.name} />;
                                                    })}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default MobileSidebar;
