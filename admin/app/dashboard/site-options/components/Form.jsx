"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { Button, Card } from "@tremor/react";
import SiteOptionSchema from "@/lib/validations/SiteOption";
import { reqAddOptions } from "@/backend/siteOption";
import General from "./General";
import User from "./User";
import Credentials from "./Credentials";
import { useOptions } from "@/lib/hooks/siteOptions.hook";

function Form() {
    const { data: options = {}, isPending: isFetchingOptions, refetch } = useOptions();

    const {
        register,
        formState: { isSubmitting, errors },
        handleSubmit,
        control,
        setValue,
    } = useForm({
        resolver: zodResolver(SiteOptionSchema.Schema),
    });

    async function handleSave(data) {
        if (isSubmitting) return;

        try {
            const req = await reqAddOptions(data);
            if (!req.success) throw new Error(req.message);

            refetch();
            toast.success("Options saved successfully.");
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (!Object.keys(errors).length) return;

        toast.error("Failed. Make sure all fields are filled correctly.");
    }, [errors]);

    useEffect(() => {
        if (!options) return;

        for (const [key, value] of Object.entries(options)) {
            setValue(key, value);
        }
    }, [options, setValue]);

    if (isFetchingOptions) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <Card>
                <TabGroup>
                    <TabList className="flex gap-4">
                        <Tab key="general" className="font-bold text-slate-800">
                            General
                        </Tab>
                        <Tab key="user" className="font-bold text-slate-800">
                            User
                        </Tab>
                        <Tab key="credentials" className="font-bold text-slate-800">
                            Credentials
                        </Tab>
                    </TabList>
                    <TabPanels className="ml-0 mt-6 w-auto sm:ml-3">
                        <TabPanel key="general">
                            <General register={register} errors={errors} control={control} setValue={setValue} />
                        </TabPanel>
                        <TabPanel key="user">
                            <User errors={errors} control={control} />
                        </TabPanel>
                        <TabPanel key="credentials">
                            <Credentials register={register} errors={errors} control={control} />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
                <div className="mt-7">
                    <Button type="submit" disabled={isSubmitting}>
                        Save Changes
                    </Button>
                </div>
            </Card>
        </form>
    );
}

export default Form;
