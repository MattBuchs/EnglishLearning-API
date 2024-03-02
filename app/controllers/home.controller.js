import * as datamappers from "../models/index.datamapper.js";

export default {
    async home(req, res) {
        const test = await datamappers.categoryDatamapper.findAll();

        return res.json(test);
    },
};
