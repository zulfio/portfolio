"use client";

import { Dialog, DialogPanel, Text, Title } from "@tremor/react";

function buildPermissionList(permissions = []) {
    let details = new Set();
    const resources = {};

    permissions.forEach((permission) => {
        const [resource, action] = permission.split("_");

        if (!resources[resource]) {
            resources[resource] = new Set();
        }

        resources[resource].add(action);

        switch (action) {
            case "create":
                details.add(`can create <strong>${resource}<strong/>`);
                break;
            case "delete":
                details.add(`can delete <strong>${resource}<strong/>`);
                break;
            case "update":
                details.add(`can update <strong>${resource}<strong/>`);
                break;
            case "read":
                details.add(`can read <strong>${resource}<strong/>`);
                break;
            case "*":
                details.add(`can access all <strong>${resource}</strong> actions`);
                break;
            default:
                break;
        }
    });

    for (const [resource, actions] of Object.entries(resources)) {
        if (actions.has("*") || ["create", "delete", "update", "read"].every((a) => actions.has(a))) {
            details.delete(`can create <strong>${resource}<strong/>`);
            details.delete(`can delete <strong>${resource}<strong/>`);
            details.delete(`can update <strong>${resource}<strong/>`);
            details.delete(`can read <strong>${resource}<strong/>`);
            details.add(`can access all <strong>${resource}</strong> actions`);
        }
    }

    if (permissions.includes("*")) {
        details.clear();
        details.add("can access all resources and actions");
    }

    return Array.from(details);
}

function DetailModal({ props: { isDetailModalOpen, setIsDetailModalOpen, selectedRole } }) {
    return (
        <Dialog open={isDetailModalOpen} onClose={(val) => setIsDetailModalOpen(val)}>
            <DialogPanel className="overflow-visible">
                <Title>{selectedRole.name}</Title>
                <Text>{selectedRole.description}</Text>
                <div className="my-5 text-slate-700">
                    <Text className="font-bold text-slate-800">Permissions:</Text>
                    <div className="max-h-[30vh] overflow-y-auto">
                        {isDetailModalOpen &&
                            buildPermissionList(selectedRole?.permissions).map((detail, index) => (
                                <p key={index} className="text-sm" dangerouslySetInnerHTML={{ __html: detail }}></p>
                            ))}
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    );
}

export default DetailModal;
