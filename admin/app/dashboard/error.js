"use client";

import { Button, Metric } from "@tremor/react";
import Image from "next/image";

export default function Error() {
    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <Image
                    src="/static/error_sign.png"
                    width={124}
                    height={124}
                    alt="error sign icon"
                    className="mb-5 mx-auto"
                />
                <Metric className="mb-5">Ooops, something went wrong!</Metric>
                <Button
                    type="submit"
                    color="rose"
                    size="sm"
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    Try again
                </Button>
            </div>
        </div>
    );
}
