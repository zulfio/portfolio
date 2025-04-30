import { useRouter } from "next/navigation";
import classNames from "@/lib/utils/dom/classNames";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

function Item({ item }) {
    const router = useRouter();

    return item.childs?.length ? (
        <Disclosure defaultOpen={false}>
            {({ open }) => (
                <>
                    <DisclosureButton
                        className={classNames(
                            item.current || item.childs.some((item) => item.current)
                                ? "bg-slate-50 text-emerald-600"
                                : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600",
                            "flex w-full items-center justify-between rounded-md p-2 text-sm font-semibold leading-6",
                        )}
                    >
                        <div className="group flex gap-x-3">
                            <item.icon
                                className={classNames(
                                    item.current || item.childs.some((item) => item.current)
                                        ? "text-emerald-600"
                                        : "text-slate-500 group-hover:text-emerald-600",
                                    "h-6 w-6 shrink-0",
                                )}
                                aria-hidden="true"
                            />
                            <span>{item.name}</span>
                        </div>
                        <ChevronUpIcon className={`${open ? "" : "rotate-180 transform"} h-5 w-5 text-slate-600`} />
                    </DisclosureButton>
                    {item.childs.map((item) => {
                        return (
                            <Transition
                                key={item.name}
                                show={open}
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <DisclosurePanel>
                                    <div
                                        className={classNames(
                                            "border-l-2 pl-9 text-sm text-slate-600",
                                            item.current ? "border-emerald-500" : "border-transparent",
                                        )}
                                    >
                                        <button
                                            onClick={() => router.push(item.href)}
                                            className="block w-full rounded py-1 pl-2 text-left hover:bg-slate-100 hover:font-bold"
                                        >
                                            {item.name}
                                        </button>
                                    </div>
                                </DisclosurePanel>
                            </Transition>
                        );
                    })}
                </>
            )}
        </Disclosure>
    ) : (
        <li key={item.name}>
            <button
                onClick={() => router.push(item.href)}
                className={classNames(
                    item.current
                        ? "bg-slate-50 text-emerald-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600",
                    "group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                )}
            >
                <item.icon
                    className={classNames(
                        item.current ? "text-emerald-600" : "text-slate-500 group-hover:text-emerald-600",
                        "h-6 w-6 shrink-0",
                    )}
                    aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
            </button>
        </li>
    );
}

export default Item;
