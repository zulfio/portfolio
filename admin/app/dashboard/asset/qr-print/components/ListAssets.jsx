"use client";

import SearchInput from "@/components/form/SearchInput";
import { useInfiniteAssets } from "@/lib/hooks/asset.hook";
import { useAssetCategories } from "@/lib/hooks/assetCategory.hook";
import { ArrowDownIcon, ArrowPathIcon, MagnifyingGlassIcon, PlusIcon, QrCodeIcon } from "@heroicons/react/20/solid";
import { Button, Card, SearchSelect, SearchSelectItem, Title } from "@tremor/react";
import { useMemo, useState } from "react";

const LIMIT = 3;

function ListAssets({ setAssetsToPrint }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: categories = [], isLoading } = useAssetCategories();
    const subCategories = categories.find((category) => category._id === selectedCategory)?.children || [];

    const [filterQuery, setFilterQuery] = useState({
        category: null,
        sub_category: null,
        search: "",
        limit: LIMIT,
    });

    const {
        data: infiniteAssets,
        isSuccess,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteAssets(filterQuery);
    const assets = useMemo(() => {
        if (!isSuccess) return [];

        return infiniteAssets.pages.reduce((acc, page) => {
            acc.push(...page.assets);
            return acc;
        }, []);
    }, [infiniteAssets, isSuccess]);

    function handleFilter() {
        setFilterQuery({
            category: selectedCategory,
            sub_category: selectedSubCategory,
            search: searchQuery,
            limit: LIMIT,
            page: 1,
        });
    }

    function handleReset() {
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setSearchQuery("");
        setFilterQuery({
            category: null,
            sub_category: null,
            search: "",
            limit: LIMIT,
            page: 1,
        });
    }

    return (
        <Card decoration="top" decorationColor="emerald" className="col-span-2">
            <div className="mb-6">
                <Title className="font-bold">PILIH ASET</Title>
                <p className="text-sm">Pilih aset mana saja yang ingin di print QR Codenya.</p>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
                <div className="max-w-sm">
                    <SearchSelect
                        placeholder="Pilih kategori"
                        disabled={isLoading}
                        onValueChange={(value) => {
                            setSelectedCategory(value);
                            setSelectedSubCategory(null);
                        }}
                        value={selectedCategory || ""}
                    >
                        {categories.map((category) => (
                            <SearchSelectItem key={category._id} value={category._id}>
                                {category.name}
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>
                </div>
                <div className="max-w-sm">
                    <SearchSelect
                        placeholder="Pilih Sub kategori"
                        disabled={isLoading || !selectedCategory}
                        onValueChange={setSelectedSubCategory}
                        value={selectedSubCategory || ""}
                    >
                        {subCategories.map((category) => (
                            <SearchSelectItem key={category._id} value={category._id}>
                                {category.name}
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>
                </div>
                <div className="max-w-sm">
                    <SearchInput placeholder="Cari nama aset" onSearch={setSearchQuery} />
                </div>
                <Button type="button" icon={MagnifyingGlassIcon} color="emerald" onClick={handleFilter}>
                    Filter
                </Button>
                <Button type="button" icon={ArrowPathIcon} color="slate" onClick={handleReset} />
            </div>

            <div className="mb-6 flex flex-col gap-3">
                {assets.map((asset) => (
                    <Card className="flex items-center justify-between gap-3 p-2" key={asset._id}>
                        <div className="h-10 w-10 rounded-md bg-white p-1 shadow">
                            <QrCodeIcon className="h-full w-full text-slate-800" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold">{asset.name}</h3>
                            <p className="text-xs">
                                {asset.category?.name} - {asset.sub_category?.name}
                            </p>
                        </div>
                        <Button
                            icon={PlusIcon}
                            className="h-9 w-9"
                            color="emerald"
                            variant="secondary"
                            type="button"
                            onClick={() => setAssetsToPrint((prev) => {
                                if (prev.find((a) => a._id === asset._id)) return prev;

                                return [...prev, asset];
                            })}
                        />
                    </Card>
                ))}
            </div>

            {hasNextPage && (
                <div className="flex justify-center">
                    <Button
                        type="button"
                        color="slate"
                        size="xs"
                        onClick={fetchNextPage}
                        disabled={isFetchingNextPage}
                        icon={ArrowDownIcon}
                    >
                        Lihat lebih banyak
                    </Button>
                </div>
            )}
        </Card>
    );
}

export default ListAssets;
