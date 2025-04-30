import SearchInput from "@/components/form/SearchInput";
import { useEmployees } from "@/lib/hooks/employee.hook";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button, SearchSelect, SearchSelectItem } from "@tremor/react";
import { useState } from "react";

export default function Filters({ onFilter }) {
    const [selectedFilter, setSelectedFilter] = useState({
        search: "",
        employeeId: "",
        program: "",
        paymentMethod: "",
        isAccepted: "",
    });

    const { data: employeesData = { employees: [] } } = useEmployees({ limit: -1, sort: "name" });
    const PROGRAMS = [
        "pendidikan",
        "sosial",
        "dakwah",
        "kesehatan",
        "ekonomi",
        "operasional_tugas_amil",
        "biaya_syiar",
        "pembelian_aset",
        "biaya_pelatihan_amil",
        "operasional_kantor",
        "operasional_amil",
        "pinbuk_donasi",
        "fee_operasional_amil",
        "refund",
        "maintenance_kantor",
        "maintenance_kendaraan",
        "maintenance_aplikasi",
        "lainnya",
    ];
    const PAYMENT_METHODS = ["transfer", "cash", "debit", "virtual_account", "lainnya"];

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onFilter(selectedFilter);
            }}
        >
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <div className="w-full sm:w-52">
                    <SearchInput
                        placeholder="Cari no ppd..."
                        onSearch={(search) => setSelectedFilter((prev) => ({ ...prev, search }))}
                    />
                </div>
                <div className="w-full sm:w-52">
                    <SearchSelect
                        placeholder="Karyawan"
                        value={selectedFilter.employeeId}
                        onValueChange={(employeeId) => {
                            setSelectedFilter((prev) => ({
                                ...prev,
                                employeeId,
                            }));
                        }}
                    >
                        {employeesData.employees.map((employee) => {
                            return (
                                <SearchSelectItem value={employee._id} key={employee._id}>
                                    {employee.name}
                                </SearchSelectItem>
                            );
                        })}
                    </SearchSelect>
                </div>
                <div className="w-full sm:w-52">
                    <SearchSelect
                        placeholder="Program"
                        value={selectedFilter.program}
                        onValueChange={(program) => {
                            setSelectedFilter((prev) => ({
                                ...prev,
                                program,
                            }));
                        }}
                    >
                        {PROGRAMS.map((program) => {
                            return (
                                <SearchSelectItem value={program} key={program} className="capitalize">
                                    {program.split("_").join(" ")}
                                </SearchSelectItem>
                            );
                        })}
                    </SearchSelect>
                </div>
                <div className="w-full sm:w-52">
                    <SearchSelect
                        placeholder="Metode Pembayaran"
                        value={selectedFilter.paymentMethod}
                        onValueChange={(paymentMethod) => {
                            setSelectedFilter((prev) => ({
                                ...prev,
                                paymentMethod,
                            }));
                        }}
                    >
                        {PAYMENT_METHODS.map((paymentMethod) => {
                            return (
                                <SearchSelectItem value={paymentMethod} key={paymentMethod} className="capitalize">
                                    {paymentMethod.split("_").join(" ")}
                                </SearchSelectItem>
                            );
                        })}
                    </SearchSelect>
                </div>
                <div className="w-full sm:w-52">
                    <SearchSelect
                        placeholder="Status"
                        value={selectedFilter.isAccepted}
                        onValueChange={(status) => {
                            setSelectedFilter((prev) => ({
                                ...prev,
                                isAccepted: status,
                            }));
                        }}
                    >
                        <SearchSelectItem value={true} className="capitalize">
                            Disetujui
                        </SearchSelectItem>
                        <SearchSelectItem value={false} className="capitalize">
                            Belum Disetujui
                        </SearchSelectItem>
                    </SearchSelect>
                </div>
            </div>
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <Button type="submit" icon={MagnifyingGlassIcon} color="slate" className="w-full sm:w-auto">
                    Filter
                </Button>
                <Button
                    type="button"
                    icon={ArrowPathIcon}
                    onClick={() => {
                        setSelectedFilter({
                            search: "",
                            employeeId: "",
                            program: "",
                            paymentMethod: "",
                            isAccepted: "",
                        });
                        onFilter({});
                    }}
                    color="rose"
                    variant="light"
                    className="w-full sm:w-auto"
                >
                    Reset
                </Button>
            </div>
        </form>
    );
}
