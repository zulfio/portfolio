import FileManager from "@/components/fileManager";
import { Card, TextInput } from "@tremor/react";
import { Controller } from "react-hook-form";

export default function Document({ defaultValue, control, register, errors }) {
    return (
        <Card>
            <h2 className="mb-7 text-xl font-bold text-slate-700">Dokumen</h2>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                    <label className="mb-1 text-sm font-medium text-slate-800">Tanda Tangan (jpg, png, jpeg)</label>
                    <Controller
                        control={control}
                        name="signature"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <FileManager
                                    defaultValues={defaultValue.signature ? [defaultValue.signature] : []}
                                    onSelect={(files) => onChange(files.map((file) => file._id)[0] || null)}
                                    trigger={value ? "Ganti Foto" : "Pilih Foto"}
                                    selectMultiple={false}
                                    withPreview={true}
                                />
                            </>
                        )}
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-slate-700">NIK</label>
                    <TextInput
                        name="nik"
                        {...register("nik_number")}
                        maxLength="100"
                        error={errors.nik_number}
                        errorMessage={errors.nik_number?.message}
                        autoComplete="off"
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-slate-700">NPWP</label>
                    <TextInput
                        name="npwp_number"
                        {...register("npwp_number")}
                        maxLength="100"
                        error={errors.npwp_number}
                        errorMessage={errors.npwp_number?.message}
                        autoComplete="off"
                    />
                </div>
                <div className="col-span-6">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Dokumen Lainnya</label>
                    <Controller
                        control={control}
                        name="other_documents"
                        render={({ field: { onChange, value } }) => (
                            <FileManager
                                defaultValues={defaultValue.other_documents}
                                onSelect={(files) => onChange(files.map((file) => file._id))}
                                trigger={value ? "Ganti Foto" : "Pilih Foto"}
                                selectMultiple={true}
                                type="image"
                                withPreview={true}
                            />
                        )}
                    />
                </div>
            </div>
        </Card>
    );
}
