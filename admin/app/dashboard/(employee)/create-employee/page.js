import { Button, Card, Metric } from "@tremor/react";
import AddForm from "./components/AddForm";
import { BuildingOffice2Icon, DocumentDuplicateIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import ROUTES from "@/config/ROUTES";
import Link from "next/link";

const NAVIGATIONS = [
    { name: "Profil", icon: UserCircleIcon, href: "#profil" },
    { name: "Kontak", icon: PhoneIcon, href: "#kontak" },
    {
        name: "Dokumen",
        icon: DocumentDuplicateIcon,
        href: "#dokumen",
    },
    {
        name: "Status Karyawan",
        icon: BuildingOffice2Icon,
        href: "#status",
    },
];

function AddEmployee() {
    return (
        <div>
            <div className="mb-7 flex items-center justify-between gap-5">
                <Metric>Tambah Karyawan</Metric>
                <Link href={ROUTES.EMPLOYEES}>
                    <Button
                        size="xs"
                        variant="primary"
                        color="slate"
                        type="button"
                        className="flex w-full items-center gap-1 sm:w-auto"
                    >
                        <span>Kembali</span>
                    </Button>
                </Link>
            </div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
                    <Card className="space-y-1 sm:sticky sm:top-10">
                        {NAVIGATIONS.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                type="button"
                                className={[
                                    "w-full text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow",
                                    "group flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
                                ]}
                                aria-current={item.current ? "page" : undefined}
                            >
                                <item.icon
                                    className={[
                                        "text-slate-500 group-hover:text-slate-900",
                                        "-ml-1 mr-3 h-6 w-6 flex-shrink-0 transition-all duration-300",
                                    ]}
                                    aria-hidden="true"
                                />
                                <span className="truncate">{item.name}</span>
                            </a>
                        ))}
                    </Card>
                </aside>

                <AddForm />
            </div>
        </div>
    );
}

export default AddEmployee;
