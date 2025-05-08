import FileManager from "@/components/fileManager";
import { TextInput } from "@tremor/react";
import Image from "next/image";
import { Controller } from "react-hook-form";

const General = ({ register, errors, control }) => {
    return (
        <div className="text-slate-800">
            <div className="mb-5">
                <div className="mb-2">
                    <span className="block text-base font-bold">Logo (135x40)</span>
                </div>

                <Controller
                    control={control}
                    name="site_logo"
                    render={({ field: { onChange, value } }) => (
                        <>
                            {value && (
                                <div className="mb-3">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_STATIC_PATH}/${value}`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: "auto", height: "100%", maxHeight: "100px" }}
                                        alt="Logo"
                                    />
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                {value && (
                                    <button
                                        className="rounded bg-rose-500 px-2 py-1 text-xs text-white"
                                        type="button"
                                        onClick={() => {
                                            onChange(null);
                                        }}
                                    >
                                        Remove
                                    </button>
                                )}
                                <FileManager
                                    open={false}
                                    selectMultiple={false}
                                    trigger={value ? "Change Logo" : "Add Logo"}
                                    onSelect={(file) => {
                                        onChange(file[0]?.path);
                                    }}
                                    type="image"
                                />
                            </div>
                        </>
                    )}
                />
            </div>

            <div className="mb-5 max-w-sm">
                <div className="mb-1">
                    <span className="block text-base font-bold">Site Title</span>
                    <span className="block text-sm">
                        Will be displayed in the title bar of the browser and in search results.
                    </span>
                </div>
                <TextInput
                    name="site_title"
                    {...register("site_title")}
                    maxLength="100"
                    error={errors.site_title}
                    errorMessage={errors.site_title?.message}
                    placeholder="My Site"
                />
            </div>

            <div className="mb-5 max-w-sm">
                <div className="mb-1">
                    <span className="block text-base font-bold">Site Description</span>
                    <span className="block text-sm">
                        In a few words, explain what this site is about. Example: "The best place to find and share
                        original recipes."
                    </span>
                </div>
                <TextInput
                    name="site_description"
                    {...register("site_description")}
                    maxLength="255"
                    error={errors.site_description}
                    errorMessage={errors.site_description?.message}
                    placeholder="The best place to find and share original recipes."
                />
            </div>

            <div className="mb-5 max-w-sm">
                <div className="mb-1">
                    <span className="block text-base font-bold">Email</span>
                </div>
                <TextInput
                    name="site_email"
                    {...register("site_email")}
                    maxLength="255"
                    error={errors.site_email}
                    errorMessage={errors.site_email?.message}
                    placeholder="example@example.com"
                />
            </div>

            <div className="mb-5 max-w-sm">
                <div className="mb-1">
                    <span className="block text-base font-bold">Years of Experience</span>
                </div>
                <TextInput
                    name="years_of_experience"
                    {...register("years_of_experience")}
                    maxLength="255"
                    error={errors.years_of_experience}
                    errorMessage={errors.years_of_experience?.message}
                    placeholder="10"
                />
            </div>

            <div className="mb-5 max-w-sm">
                <div className="mb-1">
                    <span className="block text-base font-bold">Total Clients</span>
                </div>
                <TextInput
                    name="total_clients"
                    {...register("total_clients")}
                    maxLength="255"
                    error={errors.total_clients}
                    errorMessage={errors.total_clients?.message}
                    placeholder="100"
                />
            </div>

            <div className="mb-5 max-w-sm">
                <div className="mb-1">
                    <span className="block text-base font-bold">CV Download URL</span>
                    <span className="block text-sm">
                        The URL of the CV file that will be downloaded when the user clicks the "Download CV" button.
                    </span>
                </div>
                <TextInput
                    name="cv_download_url"
                    {...register("cv_download_url")}
                    maxLength="255"
                    error={errors.cv_download_url}
                    errorMessage={errors.cv_download_url?.message}
                    placeholder="https://example.com/cv.pdf"
                />
            </div>
        </div>
    );
};

export default General;
