import * as datamappers from "../models/index.datamapper.js";

export default {
    async getCategories(req, res) {
        try {
            const categories = await datamappers.categoryDatamapper.findAll();

            if (!categories)
                throw new Error("Cotegories not found", {
                    cause: { code: 404 },
                });

            return res.json({ categories });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }

            return res
                .status(500)
                .json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
