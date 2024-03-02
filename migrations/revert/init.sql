BEGIN;

DROP TABLE 
    "user",
    "card",
    "review",
    "category",
    "battle",
    "card_has_user",
    "review_has_user",
    "card_has_category",
    "battle_has_user";

COMMIT;