import CoreDatamapper from "./core.datamapper.js";

export default class CardDatamapper extends CoreDatamapper {
    tableName = "card";

    async getPublicCardsByCategory() {
        const result = await this.client.query(
            `
            SELECT "card"."id" AS "card_id", "card"."sentence", "card"."translation", "card"."is_public",
                "user"."id" AS "user_id", "user"."username",
                "category"."id" AS "category_id", "category"."name" AS "category"
            FROM "card"
            JOIN "user" ON "user"."id" = "card"."user_id"
            LEFT JOIN "card_has_category" ON "card_has_category"."card_id" = "card"."id"
            LEFT JOIN "category" ON "category"."id" = "card_has_category"."category_id"
            WHERE "card"."is_public" = true
            ORDER BY RANDOM();
            `
        );

        return result.rows;
    }

    async getCardWithDetails(sentence, translation, userId) {
        const result = await this.client.query(
            `
            SELECT * FROM "card" 
            WHERE "sentence" = '${sentence}' 
            AND "translation" = '${translation}'
            AND "user_id" = ${userId};
            `
        );

        return result.rows[0];
    }
}
