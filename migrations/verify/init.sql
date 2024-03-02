BEGIN;

SELECT * FROM "user" WHERE false;
SELECT * FROM "card" WHERE false;
SELECT * FROM "review" WHERE false;
SELECT * FROM "category" WHERE false;
SELECT * FROM "battle" WHERE false;
SELECT * FROM "card_has_user" WHERE false;
SELECT * FROM "review_has_user" WHERE false;
SELECT * FROM "card_has_category" WHERE false;
SELECT * FROM "battle_has_user" WHERE false;

ROLLBACK;