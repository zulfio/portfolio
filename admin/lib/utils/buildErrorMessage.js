function buildErrorMessage(error) {
    if (typeof error === "string") {
        return error;
    }

    if (error?.name == "ZodError") {
        const { issues } = error;
        const messages = [];

        issues.forEach((issue) => {
            messages.push(`${issue.path.join(".")} ${issue.message}`);
        });

        return messages.join(", ");
    }

    return "Unknown error";
}

export default buildErrorMessage;
