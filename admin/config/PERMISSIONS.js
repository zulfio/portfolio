const PERMISSIONS = {
    SUPER: {
        ALL: {
            name: "*",
            label: "All Permissions",
        },
    },
    MEDIA: {
        ALL: {
            name: "media_*",
            label: "Media: All Permissions",
        },
    },
    ADMIN: {
        ALL: {
            name: "admin_*",
            label: "Admin: All Permissions",
        },
        READ: {
            name: "admin_read",
            label: "Admin: Read",
        },
        CREATE: {
            name: "admin_create",
            label: "Admin: Create",
        },
        UPDATE: {
            name: "admin_update",
            label: "Admin: Update",
        },
        DELETE: {
            name: "admin_delete",
            label: "Admin: Delete",
        },
    },
    ROLE: {
        ALL: {
            name: "role_*",
            label: "Role: All Permissions",
        },
        READ: {
            name: "role_read",
            label: "Role: Read",
        },
        CREATE: {
            name: "role_create",
            label: "Role: Create",
        },
        UPDATE: {
            name: "role_update",
            label: "Role: Update",
        },
        DELETE: {
            name: "role_delete",
            label: "Role: Delete",
        },
    },
    OPTIONS: {
        ALL: {
            name: "option_*",
            label: "Options: All Permissions",
        },
        READ: {
            name: "option_read",
            label: "Options: Read",
        },
        UPDATE: {
            name: "option_update",
            label: "Options: Update",
        },
    },
    EMPLOYEE: {
        ALL: {
            name: "employee_*",
            label: "Employee: All Permissions",
        },
        READ: {
            name: "employee_read",
            label: "Employee: Read",
        },
        CREATE: {
            name: "employee_create",
            label: "Employee: Create",
        },
        UPDATE: {
            name: "employee_update",
            label: "Employee: Update",
        },
        DELETE: {
            name: "employee_delete",
            label: "Employee: Delete",
        },
    },
    ASSET: {
        ALL: {
            name: "asset_*",
            label: "Asset: All Permissions",
        },
        READ: {
            name: "asset_read",
            label: "Asset: Read",
        },
        CREATE: {
            name: "asset_create",
            label: "Asset: Create",
        },
        UPDATE: {
            name: "asset_update",
            label: "Asset: Update",
        },
        DELETE: {
            name: "asset_delete",
            label: "Asset: Delete",
        },
        EXPORT: {
            name: "asset_export",
            label: "Asset: Export"
        },
    },
    ASSET_CATEGORY: {
        ALL: {
            name: "asset_category_*",
            label: "Asset Category: All Permissions",
        },
        READ: {
            name: "asset_category_read",
            label: "Asset Category: Read",
        },
        CREATE: {
            name: "asset_category_create",
            label: "Asset Category: Create",
        },
        UPDATE: {
            name: "asset_category_update",
            label: "Asset Category: Update",
        },
        DELETE: {
            name: "asset_category_delete",
            label: "Asset Category: Delete",
        },
    },
    ASSET_BRAND: {
        ALL: {
            name: "asset_brand_*",
            label: "Asset Brand: All Permissions",
        },
    },
    ASSET_CATEGORY: {
        ALL: {
            name: "asset_category_*",
            label: "Asset Category: All Permissions",
        },
    },
    ASSET_STORE: {
        ALL: {
            name: "asset_store_*",
            label: "Asset Store: All Permissions",
        },
    },
    ASSET_LOCATION: {
        ALL: {
            name: "asset_location_*",
            label: "Asset Location: All Permissions",
        },
    },
    FUNDING_APPLICATION: {
        ALL: {
            name: "funding_application_*",
            label: "Funding Application: All Permissions",
        },
    },
    DISTRIBUTION_PROGRAM: {
        ALL: {
            name: "distribution_program_*",
            label: "Distribution Program: All Permissions",
        },
    },
    DISTRIBUTION_ITEM: {
        ALL: {
            name: "distribution_item_*",
            label: "Distribution Item: All Permissions",
        },
    },
    DISTRIBUTION_BENEFICIARY: {
        ALL: {
            name: "distribution_beneficiary_*",
            label: "Distribution Beneficiary: All Permissions",
        },
    },
    DISTRIBUTION_APPLICATION: {
        ALL: {
            name: "distribution_application_*",
            label: "Distribution Application: All Permissions",
        },
    },
};

export default PERMISSIONS;
