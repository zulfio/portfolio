import CitySelectOptions from "@/components/form/CitySelectOptions"
import CountrySelectOptions from "@/components/form/CountrySelectOptions"
import ProvinceSelectOptions from "@/components/form/ProvinceSelectOptions"
import SubdistrictSelectOptions from "@/components/form/SubdistrictSelectOptions"
import { MUSTAHIK_TYPES } from "@/config/CONSTANTS"
import classNames from "@/lib/utils/dom/classNames"
import { Label, Radio, RadioGroup } from "@headlessui/react"
import { Divider, SearchSelect, SearchSelectItem, TextInput } from "@tremor/react"

function Beneficiary({ isCreateNew, setIsCreateNew, data, setData }) {
    return (
        <div className="mb-12">
            <Divider className="font-bold text-slate-800">PENERIMA MANFAAT</Divider>
            <div className="flex items-center">
                <input
                    id="is-create-distribution-beneficiary"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                    onChange={(value) => setIsCreateNew(value.target.checked)}
                    checked={isCreateNew}
                />
                <label
                    htmlFor="is-create-distribution-beneficiary"
                    className="ml-2 text-sm font-medium text-gray-700"
                >
                    Buat penerima manfaat baru?
                </label>
            </div>

            {isCreateNew && (
                <div>
                    <div className="my-5 flex flex-col items-center">
                        <label className="block text-sm font-medium text-gray-700">Kategori</label>
                        <div className="mt-1">
                            <RadioGroup
                                value={data.type}
                                onChange={(value) =>
                                    setData({
                                        ...data,
                                        type: value,
                                    })
                                }
                            >
                                <div className="grid grid-cols-2 gap-2">
                                    <Radio
                                        value="individual"
                                        className="relative flex cursor-pointer rounded-lg border bg-white px-4 py-2 shadow-sm focus:outline-none"
                                    >
                                        {({ checked, active }) => (
                                            <>
                                                <span className="flex flex-1">
                                                    <Label
                                                        as="span"
                                                        className="block text-sm font-medium capitalize text-gray-900"
                                                    >
                                                        Individu
                                                    </Label>
                                                </span>
                                                <span
                                                    className={classNames(
                                                        active ? "border" : "border-2",
                                                        checked
                                                            ? "border-emerald-500"
                                                            : "border-transparent",
                                                        "pointer-events-none absolute -inset-px rounded-lg",
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Radio>
                                    <Radio
                                        value="organization"
                                        className="relative flex cursor-pointer rounded-lg border bg-white px-4 py-2 shadow-sm focus:outline-none"
                                    >
                                        {({ checked, active }) => (
                                            <>
                                                <span className="flex flex-1">
                                                    <Label
                                                        as="span"
                                                        className="block text-sm font-medium capitalize text-gray-900"
                                                    >
                                                        Organisasi
                                                    </Label>
                                                </span>
                                                <span
                                                    className={classNames(
                                                        active ? "border" : "border-2",
                                                        checked
                                                            ? "border-emerald-500"
                                                            : "border-transparent",
                                                        "pointer-events-none absolute -inset-px rounded-lg",
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Radio>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {data.type === "individual" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Asnaf</label>
                                <div className="mt-1">
                                    <SearchSelect
                                        onValueChange={(value) =>
                                            setData({
                                                ...data,
                                                mustahik: value,
                                            })
                                        }
                                        placeholder="Pilih..."
                                    >
                                        {MUSTAHIK_TYPES.map((type) => (
                                            <SearchSelectItem
                                                key={type}
                                                value={type}
                                                className="capitalize"
                                            >
                                                {type.split("_").join(" ")}
                                            </SearchSelectItem>
                                        ))}
                                    </SearchSelect>
                                </div>
                            </div>
                        )}

                        {data.type === "individual" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">NIK</label>
                                <div className="mt-1">
                                    <TextInput
                                        maxLength="255"
                                        autoComplete="off"
                                        placeholder="3273..."
                                        onValueChange={(value) =>
                                            setData({
                                                ...data,
                                                nik: value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama</label>
                            <div className="mt-1">
                                <TextInput
                                    maxLength="255"
                                    autoComplete="off"
                                    placeholder="Penerima manfaat"
                                    onValueChange={(value) =>
                                        setData({
                                            ...data,
                                            name: value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {data.type === "individual" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Jenis Kelamin
                                </label>
                                <div className="mt-1">
                                    <RadioGroup
                                        value={data.gender}
                                        onChange={(value) =>
                                            setData({
                                                ...data,
                                                gender: value,
                                            })
                                        }
                                    >
                                        <div className="grid grid-cols-2 gap-2">
                                            <Radio
                                                value="male"
                                                className="relative flex cursor-pointer rounded-lg border bg-white px-4 py-2 shadow-sm focus:outline-none"
                                            >
                                                {({ checked, active }) => (
                                                    <>
                                                        <span className="flex flex-1">
                                                            <Label
                                                                as="span"
                                                                className="block text-sm font-medium capitalize text-gray-900"
                                                            >
                                                                Laki-laki
                                                            </Label>
                                                        </span>
                                                        <span
                                                            className={classNames(
                                                                active ? "border" : "border-2",
                                                                checked
                                                                    ? "border-emerald-500"
                                                                    : "border-transparent",
                                                                "pointer-events-none absolute -inset-px rounded-lg",
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                )}
                                            </Radio>
                                            <Radio
                                                value="female"
                                                className="relative flex cursor-pointer rounded-lg border bg-white px-4 py-2 shadow-sm focus:outline-none"
                                            >
                                                {({ checked, active }) => (
                                                    <>
                                                        <span className="flex flex-1">
                                                            <Label
                                                                as="span"
                                                                className="block text-sm font-medium capitalize text-gray-900"
                                                            >
                                                                Perempuan
                                                            </Label>
                                                        </span>
                                                        <span
                                                            className={classNames(
                                                                active ? "border" : "border-2",
                                                                checked
                                                                    ? "border-emerald-500"
                                                                    : "border-transparent",
                                                                "pointer-events-none absolute -inset-px rounded-lg",
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                )}
                                            </Radio>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nomor HP/WA
                            </label>
                            <div className="mt-1">
                                <TextInput
                                    maxLength="255"
                                    autoComplete="off"
                                    placeholder="08123...."
                                    onValueChange={(value) =>
                                        setData({
                                            ...data,
                                            phoneNumber: value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <Divider />

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700">
                            Lokasi Penyaluran
                        </label>
                        <div className="mt-1">
                            <textarea
                                className="tremor-Textarea-Textarea rounded-tremor-default border-tremor-border bg-tremor-background text-tremor-default text-tremor-content shadow-tremor-input placeholder:text-tremor-content hover:bg-tremor-background-muted focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content dark:shadow-dark-tremor-input dark:placeholder:text-dark-tremor-content dark:hover:bg-dark-tremor-background-muted focus:dark:border-dark-tremor-brand-subtle focus:dark:ring-dark-tremor-brand-muted flex w-full items-center border px-3 py-2 outline-none transition duration-100 focus:ring-2"
                                name="description"
                                placeholder="Type..."
                                maxLength="100"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        address: {
                                            ...data.address,
                                            complete: e.target.value
                                        }
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div>
                            <label className="text-sm font-medium text-slate-800">Negara</label>
                            <CountrySelectOptions
                                value={data.address.country || undefined}
                                onValueChange={country => {
                                    setData({
                                        ...data,
                                        address: {
                                            ...data.address,
                                            country
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-800">Provinsi</label>
                            <ProvinceSelectOptions
                                value={data.address.province || undefined}
                                onValueChange={province => {
                                    setData({
                                        ...data,
                                        address: {
                                            ...data.address,
                                            province
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-800">Kabupaten/Kota</label>
                            <CitySelectOptions
                                provinceId={data.address.province?.id || undefined}
                                value={data.address.city || undefined}
                                onValueChange={city => {
                                    setData({
                                        ...data,
                                        address: {
                                            ...data.address,
                                            city
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-800">Kecamatan</label>
                            <SubdistrictSelectOptions
                                cityId={data.address.city?.id || undefined}
                                value={data.address.subdistrict || undefined}
                                onValueChange={subdistrict => {
                                    setData({
                                        ...data,
                                        address: {
                                            ...data.address,
                                            subdistrict
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-800">Desa</label>
                            <div className="mt-1">
                                <TextInput
                                    maxLength="255"
                                    autoComplete="off"
                                    placeholder="Desa / Kelurahan"
                                    onValueChange={(value) =>
                                        setData({
                                            ...data,
                                            address: {
                                                ...data.address,
                                                village: value
                                            }
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* {!isCreateNewProgram && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pilih Program</label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="program"
                                            render={({ field: { onChange, value } }) => (
                                                <SearchSelect
                                                    value={value}
                                                    onValueChange={onChange}
                                                    placeholder="Pilih..."
                                                    error={errors.amountSource}
                                                    errorMessage={errors.amountSource?.message}
                                                >
                                                    {distributionPrograms.data.map((program) => (
                                                        <SearchSelectItem
                                                            key={program._id}
                                                            value={program._id}
                                                            className="capitalize"
                                                        >
                                                            {program.name}
                                                        </SearchSelectItem>
                                                    ))}
                                                </SearchSelect>
                                            )}
                                        />
                                    </div>
                                </div>
                            )} */}
        </div>
    )
}

export default Beneficiary