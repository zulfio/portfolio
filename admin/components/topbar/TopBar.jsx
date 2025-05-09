import { useOptions } from "@/lib/hooks/siteOptions.hook";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

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
        />
    ) : (
        <div className="h-16 w-40 bg-gray-200" />
    );
}

function TopBar({ children }) {
    const { data, isPending } = useOptions();
    return (
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="hidden h-16 shrink-0 items-center lg:flex">
                <SiteLogo isPending={isPending} path={data?.site_logo} />
            </div>
            <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                    Search
                </label>
                <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                />
                <input
                    id="search-field"
                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder='Try type "add user"'
                    type="text"
                    name="search_feature"
                    autoComplete="off"
                />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button> */}

                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />
                {children}
            </div>
        </div>
    );
}

export default TopBar;
