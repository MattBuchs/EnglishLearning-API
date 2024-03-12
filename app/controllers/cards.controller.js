import * as datamappers from "../models/index.datamapper.js";

export default {
    async getAllPublicCards(req, res) {
        try {
            const cards =
                await datamappers.cardDatamapper.getPublicCardsByCategory();

            if (!cards)
                throw new Error("Cards not found", { cause: { code: 404 } });

            return res.json({ cards });
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

    async getMyCards(req, res) {
        const { userId } = req.user;
        const cards = await datamappers.cardDatamapper.findByKeyValue(
            "user_id",
            userId
        );

        if (!cards)
            throw new Error("Cards not found", { cause: { code: 404 } });

        return res.json({ cards });
    },

    async createCard(req, res) {
        const { sentence, translation, isPublic, categoryId } = req.body;
        const { userId } = req.user;

        try {
            if (
                !sentence ||
                !translation ||
                !categoryId ||
                isPublic === undefined
            ) {
                throw new Error("Missing values", { cause: { code: 400 } });
            }

            const createCard = await datamappers.cardDatamapper.create({
                sentence,
                translation,
                is_public: isPublic,
                user_id: userId,
            });
            if (!createCard)
                throw new Error("Card creation failed", {
                    cause: { code: 400 },
                });

            const card = await datamappers.cardDatamapper.getCardWithDetails(
                sentence,
                translation,
                userId
            );

            await datamappers.cardUserDatamapper.create({
                card_id: card.id,
                user_id: userId,
            });

            await datamappers.cardCategoryDatamapper.create({
                card_id: card.id,
                category_id: categoryId,
            });

            res.json({ message: "Card created successfully" });
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
