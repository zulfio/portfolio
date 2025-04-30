/**
 * A utility class for filtering and querying data from a database model.
 */
class FilterAPI {
    /**
     * Creates an instance of FilterAPI.
     * @param {Object} model - The database model to query.
     * @param {Object} query - The query parameters.
     * @param {Object} [data=undefined] - The data to filter.
     */
    constructor(model, query, data = undefined) {
        this.model = model;
        this.query = query;
        this.data = data;
    }

    /**
     * Applies the filter to the data based on the query parameters.
     * @returns {FilterAPI} - The current instance of FilterAPI.
     */
    get() {
        const excludedQuery = ["sort", "page", "limit", "fields"];
        let query = { ...this.query };

        Object.keys(query).forEach((key) => {
            if (excludedQuery.indexOf(key) !== -1) delete query[key];
        });

        this.data = this.model.find(query);

        if (!this.query.sort) {
            this.data.sort("-createdAt");
        }

        return this;
    }

    /**
     * Sorts the data based on the "sort" query parameter.
     * @returns {FilterAPI} - The current instance of FilterAPI.
     */
    sort() {
        if (this.query.sort) {
            const sortQuery = this.query.sort.split(",").join(" ");
            this.data.collation({ locale: "en" }).sort(sortQuery);
        }

        return this;
    }

    /**
     * Selects specific fields from the data based on the "fields" query parameter.
     * @returns {FilterAPI} - The current instance of FilterAPI.
     */
    fields() {
        if (this.query.fields) {
            const fieldsQuery = this.query.fields.split(",").join(" ");
            this.data.select(fieldsQuery);
        }

        return this;
    }

    /**
     * Applies pagination to the data based on the "page" and "limit" query parameters.
     * @returns {FilterAPI} - The current instance of FilterAPI.
     */
    pagination() {
        const limit = this.query.limit * 1 || 5;

        if (limit !== -1) {
            const page = this.query.page * 1 || 1;
            const skip = (page - 1) * limit;
            const additionalSkip = this.query.additionalSkip * 1 || 0;

            this.data.skip(skip + additionalSkip).limit(limit);
        }

        return this;
    }

    populate(schema, fields) {
        this.data.populate(schema, fields);
        return this;
    }
}

export default FilterAPI;
