import { DEPARTEMENTS, DIVISIONS, POSITIONS } from "@/config/CONSTANTS";
import { Card, DatePicker, SearchSelect, SearchSelectItem, Tab, TabGroup, TabList } from "@tremor/react";
import { useCallback } from "react";
import { Controller, useFormState } from "react-hook-form";

export default function JobStatus({ control }) {
    const { isSubmitted } = useFormState({
        control,
    });

    const MemoizedJoinDate = useCallback(() => {
        return (
            <Controller
                control={control}
                name="join_at"
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
        );
    }, [isSubmitted, control]);

    const MemoizedPositionOptions = useCallback(() => {
        return (
            <Controller
                control={control}
                name="position"
                render={({ field: { onChange, value } }) => {
                    return (
                        <>
                            <TabGroup defaultIndex={POSITIONS.indexOf(value)}>
                                <TabList variant="solid" className="bg-slate-50">
                                    {POSITIONS.map((position) => {
                                        return (
                                            <Tab onClick={() => onChange(position)} key={position}>
                                                <span className="capitalize">{position}</span>
                                            </Tab>
                                        );
                                    })}
                                </TabList>
                            </TabGroup>
                        </>
                    );
                }}
            />
        );
    }, [isSubmitted, control]);

    const MemoizedDepartementOptions = useCallback(() => {
        return (
            <Controller
                control={control}
                name="department"
                render={({ field: { onChange, value } }) => (
                    <TabGroup defaultIndex={DEPARTEMENTS.indexOf(value)}>
                        <TabList variant="solid" className="bg-slate-50">
                            {DEPARTEMENTS.map((department) => {
                                return (
                                    <Tab onClick={() => onChange(department)} key={department}>
                                        <span className="capitalize">{department}</span>
                                    </Tab>
                                );
                            })}
                        </TabList>
                    </TabGroup>
                )}
            />
        );
    }, [isSubmitted, control]);

    return (
        <Card>
            <h2 className="mb-7 text-xl font-bold text-slate-700">Status Karyawan</h2>

            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Bergabung Pada</label>
                    <MemoizedJoinDate />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Jabatan</label>
                    <MemoizedPositionOptions />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Departement</label>
                    <MemoizedDepartementOptions />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Divisi
                    </label>
                    <Controller
                        control={control}
                        name="division"
                        render={({ field: { onChange, value } }) => (
                            <SearchSelect onValueChange={onChange} value={value}>
                                {DIVISIONS?.map((division) => {
                                    return (
                                        <SearchSelectItem value={division} key={division} className="cursor-pointer">
                                            {division}
                                        </SearchSelectItem>
                                    );
                                })}
                            </SearchSelect>
                        )}
                    />
                </div>
            </div>
        </Card>
    );
}
