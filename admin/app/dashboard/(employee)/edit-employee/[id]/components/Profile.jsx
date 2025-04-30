import FileManager from "@/components/fileManager";
import { GENDERS } from "@/config/CONSTANTS";
import { Card, DatePicker, Tab, TabGroup, TabList, TextInput } from "@tremor/react";
import { useCallback } from "react";
import { Controller, useFormState } from "react-hook-form";

export default function Profile({ defaultValue, control, register, errors }) {
    const { isSubmitted } = useFormState({
        control,
    });

    const MemoizedGenderOptions = useCallback(() => {
        return (
            <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                    <TabGroup defaultIndex={GENDERS.indexOf(value)}>
                        <TabList variant="solid" className="bg-slate-50">
                            {GENDERS.map((gender) => (
                                <Tab onClick={() => onChange(gender)} key={gender}>
                                    <span className="capitalize">{gender}</span>
                                </Tab>
                            ))}
                        </TabList>
                    </TabGroup>
                )}
            />
        );
    }, [isSubmitted, control]);

    return (
        <Card>
            <h2 className="mb-7 text-xl font-bold text-slate-700">Profil</h2>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                    <label className="mb-1 text-sm font-medium text-slate-800">Foto Karyawan</label>
                    <Controller
                        control={control}
                        name="profile_picture"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <FileManager
                                    defaultValues={defaultValue.profile_picture ? [defaultValue.profile_picture] : []}
                                    onSelect={(files) => onChange(files.map((file) => file._id)[0] || null)}
                                    trigger={value ? "Ganti Foto" : "Pilih Foto"}
                                    selectMultiple={false}
                                    withPreview={true}
                                />
                            </>
                        )}
                    />
                </div>

                <div className="col-span-6">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Nama Lengkap*</label>
                    <TextInput
                        name="name"
                        {...register("name")}
                        maxLength="100"
                        error={errors.name}
                        errorMessage={errors.name?.message}
                        autoComplete="off"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Tanggal Lahir</label>
                    <Controller
                        control={control}
                        name="date_of_birth"
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

                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Jenis Kelamin</label>
                    <MemoizedGenderOptions />
                </div>
            </div>
        </Card>
    );
}
