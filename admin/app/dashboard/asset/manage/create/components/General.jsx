import { useAssetCategories } from "@/lib/hooks/assetCategory.hook";
import { useAssetLocations } from "@/lib/hooks/assetLocation.hook";
import { useEmployees } from "@/lib/hooks/employee.hook";
import { Card, SearchSelect, SearchSelectItem, TextInput, Title } from "@tremor/react";
import { Controller } from "react-hook-form";

function SelectAuthor({ control, errors }) {
    const { data = { employees: [] }, isLoading } = useEmployees({ limit: -1, sort: "name" });

    return (
        <div className="mb-6 flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-800">Penanggung Jawab*</label>
            <Controller
                control={control}
                name="author"
                render={({ field: { onChange, value } }) => (
                    <SearchSelect
                        onValueChange={onChange}
                        value={value}
                        disabled={isLoading}
                        error={errors.author}
                        errorMessage={errors.author?.message}>
                        {data.employees.map((employee) => {
                            return (
                                <SearchSelectItem value={employee._id} key={employee._id} className="cursor-pointer">
                                    {employee.name}
                                </SearchSelectItem>
                            );
                        })}
                    </SearchSelect>
                )}
            />
        </div>
    );
}

function SelectLocation({ control, errors }) {
    const { data = [], isLoading } = useAssetLocations({ sort: "name" });

    return (
        <div className="mb-6 flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-800">Lokasi Asset*</label>
            <Controller
                control={control}
                name="location"
                render={({ field: { onChange, value } }) => (
                    <SearchSelect
                        onValueChange={onChange}
                        value={value}
                        disabled={isLoading}
                        error={errors.location}
                        errorMessage={errors.location?.message}>
                        {data.map((location) => {
                            return (
                                <SearchSelectItem
                                    value={location._id}
                                    key={location._id}
                                    className="cursor-pointer">
                                    {location.name}
                                </SearchSelectItem>
                            );
                        })}
                    </SearchSelect>
                )}
            />
        </div>
    );
}

function General({ register, errors, control, watch }) {
    const { data: categories = [], isLoading: isFetchingCategories } = useAssetCategories();
    const subCategory = categories.find((category) => category._id === watch("category"))?.children || [];

    return (
        <Card
            decoration="top"
            decorationColor="emerald"
        >
            <Title className="mb-6 font-bold">Umum</Title>

            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Nama Aset*</label>
                <TextInput
                    name="name"
                    {...register("name")}
                    maxLength="100"
                    error={errors.name}
                    errorMessage={errors.name?.message}
                    autoComplete="off"
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Kode Aset</label>
                <TextInput
                    placeholder="otomatis dibuat"
                    disabled
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Kategori
                </label>
                <Controller
                    control={control}
                    name="category"
                    render={({ field: { onChange, value } }) => (
                        <SearchSelect onValueChange={onChange} value={value} disabled={isFetchingCategories}>
                            {categories.map((category) => {
                                return (
                                    <SearchSelectItem value={category._id} key={category._id} className="cursor-pointer">
                                        {category.name}
                                    </SearchSelectItem>
                                );
                            })}
                        </SearchSelect>
                    )}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Sub Kategori
                </label>
                <Controller
                    control={control}
                    name="sub_category"
                    render={({ field: { onChange, value } }) => (
                        <SearchSelect onValueChange={onChange} value={value} disabled={isFetchingCategories}>
                            {subCategory.map((category) => {
                                return (
                                    <SearchSelectItem value={category._id} key={category._id} className="cursor-pointer">
                                        {category.name}
                                    </SearchSelectItem>
                                );
                            })}
                        </SearchSelect>
                    )}
                />
            </div>
            <SelectAuthor control={control} errors={errors} />
            <SelectLocation control={control} errors={errors} />
        </Card>
    )
}

export default General