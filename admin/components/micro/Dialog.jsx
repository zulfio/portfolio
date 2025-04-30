import { Dialog as TremorDialog, DialogPanel } from "@tremor/react";
import React from "react";

function Dialog({ children, open = false, onClose = () => {}, className = "max-w-screen-2xl" }) {
    return (
        <TremorDialog open={open} onClose={onClose} static={true}>
            <DialogPanel className={className}>{children}</DialogPanel>
        </TremorDialog>
    );
}

export default Dialog;
