import * as datamappers from "../models/index.datamapper.js";

export default {
    async getUserProfile(req, res) {
        const { username } = req.params;

        try {
            const user = await datamappers.userDatamapper.findOne(
                "username",
                username
            );

            if (!user)
                throw new Error("User not found", { cause: { code: 404 } });

            // Supprime la propriété 'password' de l'objet 'user'
            delete user.password;

            return res.json({ user });
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
