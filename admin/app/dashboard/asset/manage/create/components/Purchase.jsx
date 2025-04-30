import { TextInput, Card, DatePicker, Title, SearchSelect, SearchSelectItem, NumberInput } from "@tremor/react"
import { Controller } from "react-hook-form"
import { formatIndonesianCurrency } from "@/lib/utils/string"
import { useAssetStores } from "@/lib/hooks/assetStore.hook";

function SelectStore({ control }) {
    const { data = { stores: [] }, isLoading } = useAssetStores({ limit: -1, sort: "name" });

    return (
        <div className="mb-6 flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-800">Toko / Distributor</label>
            <Controller
                control={control}
                name="store"
                render={({ field: { onChange, value } }) => (
                    <SearchSelect onValueChange={onChange} value={value} disabled={isLoading}>
                        {data.stores.map((store) => {
                            return (
                                <SearchSelectItem value={store._id} key={store._id} className="cursor-pointer">
                                    {store.name}
                                </SearchSelectItem>
                            );
                        })}
                    </SearchSelect>
                )}
            />
        </div>
    );
}

function Purchase({ control, register, errors, watch }) {
    return (
        <Card
            decoration="top"
            decorationColor="emerald"
        >
            <Title className="mb-6 font-bold">Pembelian</Title>

            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Tanggal Pembelian</label>
                <Controller
                    control={control}
                    name="purchase_date"
                    render={({ field: { onChange, value } }) => (
                        <DatePicker
                            placeholder="Pilih tanggal"
                            maxDate={new Date()}
                            enableYearNavigation
                            displayFormat="dd MMMM yyyy"
                            onValueChange={(value) => onChange(value.toISOString())}
                            value={value ? new Date(value) : null}
                        />
                    )}
                />
            </div>

            <SelectStore control={control} />

            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">No. Invoice</label>
                <TextInput
                    name="invoice_number"
                    {...register("invoice_number")}
                    maxLength="100"
                    error={errors.invoice_number}
                    errorMessage={errors.invoice_number?.message}
                    autoComplete="off"
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Jumlah*</label>
                <Controller
                    control={control}
                    name="total_units"
                    render={({ field: { onChange } }) => (
                        <NumberInput
                            min={0}
                            error={errors.total_units}
                            errorMessage={errors.total_units?.message}
                            placeholder="0"
                            onValueChange={onChange}
                        />
                    )}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Harga Satuan</label>
                <Controller
                    control={control}
                    name="price_per_unit"
                    render={({ field: { onChange } }) => (
                        <NumberInput
                            min={0}
                            error={errors.price_per_unit}
                            errorMessage={errors.price_per_unit?.message}
                            onValueChange={onChange}
                            placeholder="0"
                        />
                    )}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Harga Total</label>
                <TextInput
                    disabled
                    value={formatIndonesianCurrency(watch("total_units", 0) * watch("price_per_unit", 0))}
                />
            </div>
        </Card>
    )
}

export default Purchase