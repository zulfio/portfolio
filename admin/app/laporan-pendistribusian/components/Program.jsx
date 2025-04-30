import { LAZ_PROGRAM_TYPES } from "@/config/CONSTANTS";
import { useDistributionPrograms } from "@/lib/hooks/distributionProgram.hook";
import { Divider, SearchSelect, SearchSelectItem, TextInput } from "@tremor/react"
import { Controller } from "react-hook-form";

function Program({ control, errors, isCreateNewProgram, setIsCreateNewProgram, newProgram, setNewProgram }) {
    const { data: distributionPrograms = { data: [], total: 0 } } = useDistributionPrograms({
        limit: -1,
        sort: "name",
    });

    return (
        <div className="mb-12">
            <Divider className="font-bold text-slate-800">PROGRAM</Divider>
            <div className="mb-7 flex items-center">
                <input
                    id="is-create-program"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                    onChange={(value) => setIsCreateNewProgram(value.target.checked)}
                    checked={isCreateNewProgram}
                />
                <label htmlFor="is-create-program" className="ml-2 text-sm font-medium text-gray-700">
                    Buat program baru?
                </label>
            </div>

            {isCreateNewProgram && (
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                        <div className="mt-1">
                            <TextInput
                                maxLength="255"
                                autoComplete="off"
                                placeholder="Masukkan nama program"
                                onValueChange={(value) => setNewProgram({ ...newProgram, name: value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipe</label>
                        <div className="mt-1">
                            <SearchSelect
                                onValueChange={(value) => setNewProgram({ ...newProgram, type: value })}
                                placeholder="Pilih..."
                            >
                                {LAZ_PROGRAM_TYPES.map((program) => (
                                    <SearchSelectItem
                                        key={program}
                                        value={program}
                                        className="capitalize"
                                    >
                                        {program.split("_").join(" ")}
                                    </SearchSelectItem>
                                ))}
                            </SearchSelect>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea
                            className="tremor-Textarea-Textarea rounded-tremor-default border-tremor-border bg-tremor-background text-tremor-default text-tremor-content shadow-tremor-input placeholder:text-tremor-content hover:bg-tremor-background-muted focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content dark:shadow-dark-tremor-input dark:placeholder:text-dark-tremor-content dark:hover:bg-dark-tremor-background-muted focus:dark:border-dark-tremor-brand-subtle focus:dark:ring-dark-tremor-brand-muted flex w-full items-center border px-3 py-2 outline-none transition duration-100 focus:ring-2"
                            placeholder="..."
                            maxLength="500"
                            onChange={(e) =>
                                setNewProgram({ ...newProgram, description: e.target.value })
                            }
                        />
                    </div>
                </div>
            )}

            {!isCreateNewProgram && (
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
                                    error={errors.program}
                                    errorMessage={errors.program?.message}
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
            )}
        </div>
    )
}

export default Program