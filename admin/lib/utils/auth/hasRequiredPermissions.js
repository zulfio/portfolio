/**
 * Checks if a user has the required permissions.
 *
 * @param {string[]} userPermissions - The permissions of the user.
 * @param {string[]} requiredPermissions - The required permissions.
 * @returns {boolean} - Returns true if the user has the required permissions, otherwise false.
 */
function hasRequiredPermissions(userPermissions = [], requiredPermissions = []) {
    if (requiredPermissions.length === 0) {
        return true;
    }

    return requiredPermissions.some((permission) => {
        const resource = permission.split("_")[0];

        return (
            userPermissions.includes(permission) ||
            userPermissions.includes(`${resource}_*`) ||
            userPermissions.includes("*")
        );
    });
}

export default hasRequiredPermissions;
