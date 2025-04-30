import { useAssetBrands } from "@/lib/hooks/assetBrand.hook";
import { Card, NumberInput, SearchSelect, SearchSelectItem, TextInput, Title } from "@tremor/react"
import { Controller } from "react-hook-form";

function SelectBrand({ control }) {
    const { data = [], isLoading } = useAssetBrands({ sort: "name" });

    return (
        <div className="mb-6 flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-800">Pilih Merk</label>
            <Controller
                control={control}
                name="brand"
                render={({ field: { onChange, value } }) => (
                    <SearchSelect onValueChange={onChange} value={value} disabled={isLoading}>
                        {data.map((brand) => {
                            return (
                                <SearchSelectItem value={brand._id} key={brand._id} className="cursor-pointer">
                                    {brand.name}
                                </SearchSelectItem>
                            );
                        })}
                    </SearchSelect>
                )}
            />
        </div>
    );
}

function Detail({ control, register, errors }) {
    return (
        <Card
            decoration="top"
            decorationColor="emerald"
        >
            <Title className="mb-6 font-bold">Detail Asset</Title>

            <SelectBrand control={control} />
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Tipe</label>
                <TextInput
                    name="type"
                    {...register("type")}
                    maxLength="100"
                    error={errors.type}
                    errorMessage={errors.type?.message}
                    autoComplete="off"
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Produsen</label>
                <TextInput
                    name="manufacturer"
                    {...register("manufacturer")}
                    maxLength="100"
                    error={errors.manufacturer}
                    errorMessage={errors.manufacturer?.message}
                    autoComplete="off"
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">No. Seri / Produksi</label>
                <TextInput
                    name="serial_number"
                    {...register("serial_number")}
                    maxLength="100"
                    error={errors.serial_number}
                    errorMessage={errors.serial_number?.message}
                    autoComplete="off"
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Tahun Produksi</label>
                <Controller
                    control={control}
                    name="production_year"
                    render={({ field: { onChange } }) => (
                        <NumberInput
                            min={0}
                            max={new Date().getFullYear() + 1}
                            error={errors.production_year}
                            errorMessage={errors.production_year?.message}
                            placeholder="2024"
                            onValueChange={onChange}
                        />
                    )}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Deskripsi</label>
                <TextInput
                    name="description"
                    {...register("description")}
                    maxLength="100"
                    error={errors.description}
                    errorMessage={errors.description?.message}
                    autoComplete="off"
                />
            </div>
        </Card>
    )
}

export default Detail