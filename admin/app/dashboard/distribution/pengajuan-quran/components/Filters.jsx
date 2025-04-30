import SearchInput from "@/components/form/SearchInput";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button } from "@tremor/react";
import { useState } from "react";

export default function Filters({ onFilter }) {
    const [selectedFilter, setSelectedFilter] = useState({
        search: "",
        province: "",
        city: "",
        subdistrict: "",
        isAccepted: "",
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onFilter(selectedFilter);
            }}
        >
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <div className="w-full">
                    <SearchInput
                        placeholder="Cari nama..."
                        onSearch={(search) => setSelectedFilter((prev) => ({ ...prev, search }))}
                    />
                </div>
                {/* <div className="w-full sm:w-52">
                    <ProvinceSelectOptions
                        value={selectedFilter.province}
                        onValueChange={(province) => {
                            setSelectedFilter((prev) => ({
                                ...prev,
                                province,
                            }));
                        }}
                    />
                </div> */}
                {/* <div className="w-full sm:w-52">
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
                </div> */}
            </div>
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <Button type="submit" icon={MagnifyingGlassIcon} color="slate" className="w-full sm:w-auto">
                    Cari
                </Button>
                <Button
                    type="reset"
                    icon={ArrowPathIcon}
                    onClick={() => {
                        setSelectedFilter({
                            search: "",
                            province: "",
                            city: "",
                            subdistrict: "",
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
