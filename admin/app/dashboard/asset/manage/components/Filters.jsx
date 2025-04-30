import SearchInput from "@/components/form/SearchInput";
import { useAssetBrands } from "@/lib/hooks/assetBrand.hook";
import { useAssetCategories } from "@/lib/hooks/assetCategory.hook";
import { useAssetLocations } from "@/lib/hooks/assetLocation.hook";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button, SearchSelect, SearchSelectItem } from "@tremor/react";
import { useState } from "react";

export default function Filters({ onFilter }) {
    const [selectedFilter, setSelectedFilter] = useState({
        search: "",
        category: "",
        sub_category: "",
        brand: "",
        location: "",
    });

    const { data: categories = [] } = useAssetCategories();
    const sub_category = categories.find((category) => category._id === selectedFilter.category)?.children || [];
    const { data: brands = [] } = useAssetBrands();
    const { data: locations = [] } = useAssetLocations();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onFilter(selectedFilter);
            }}
            className="mb-5 flex flex-wrap items-center justify-start gap-2 sm:gap-4"
        >
            <div className="w-full sm:w-48">
                <SearchInput placeholder="Cari nama aset..." onSearch={(search) => setSelectedFilter((prev) => ({ ...prev, search }))} />
            </div>
            <div className="w-full sm:w-48">
                <SearchSelect
                    placeholder="kategori"
                    value={selectedFilter.category}
                    onValueChange={(category) => {
                        setSelectedFilter((prev) => ({
                            ...prev,
                            category,
                        }));
                    }}
                >
                    {categories.map((category) => {
                        return (
                            <SearchSelectItem value={category._id} key={category._id}>
                                {category.name}
                            </SearchSelectItem>
                        );
                    })}
                </SearchSelect>
            </div>
            <div className="w-full sm:w-48">
                <SearchSelect
                    placeholder="sub kategori"
                    value={selectedFilter.sub_category}
                    onValueChange={(sub_category) => {
                        setSelectedFilter((prev) => ({
                            ...prev,
                            sub_category,
                        }));
                    }}
                >
                    {sub_category?.map((sub_category) => {
                        return (
                            <SearchSelectItem value={sub_category._id} key={sub_category._id}>
                                {sub_category.name}
                            </SearchSelectItem>
                        );
                    })}
                </SearchSelect>
            </div>
            <div className="w-full sm:w-48">
                <SearchSelect
                    placeholder="merk"
                    value={selectedFilter.brand}
                    onValueChange={(brand) => {
                        setSelectedFilter((prev) => ({
                            ...prev,
                            brand,
                        }));
                    }}
                >
                    {brands.map((brand) => {
                        return (
                            <SearchSelectItem value={brand._id} key={brand._id}>
                                {brand.name}
                            </SearchSelectItem>
                        );
                    })}
                </SearchSelect>
            </div>
            <div className="w-full sm:w-48">
                <SearchSelect
                    placeholder="lokasi"
                    value={selectedFilter.location}
                    onValueChange={(location) => {
                        setSelectedFilter((prev) => ({
                            ...prev,
                            location,
                        }));
                    }}
                >
                    {locations.map((location) => {
                        return (
                            <SearchSelectItem value={location._id} key={location._id}>
                                {location.name}
                            </SearchSelectItem>
                        );
                    })}
                </SearchSelect>
            </div>
            <Button
                type="submit"
                icon={MagnifyingGlassIcon}
                color="emerald"
                className="w-full sm:w-auto"
            />
            <Button
                type="button"
                icon={ArrowPathIcon}
                onClick={() => {
                    setSelectedFilter({
                        search: "",
                        category: "",
                        sub_category: "",
                        brand: "",
                        location: "",
                    });
                    onFilter({});
                }}
                color="slate"
                className="w-full sm:w-auto"
            />
        </form>
    );
}
