export default class CoreDatamapper {
    client;

    tableName;

    constructor(client) {
        this.client = client;
    }

    async findAll() {
        const result = await this.client.query(
            `SELECT * FROM "${this.tableName}"`
        );

        return result.rows;
    }

    async findOne(key, value) {
        const result = await this.client.query(
            `SELECT * FROM "${this.tableName}" WHERE ${key} = $1`,
            [value]
        );

        return result.rows[0] || null;
    }

    async findByKeyValue(key, value) {
        const result = await this.client.query(
            `SELECT * FROM "${this.tableName}" WHERE ${key} = $1`,
            [value]
        );

        return result.rows || null;
    }

    async create(inputData) {
        const fields = Object.keys(inputData);
        const values = Object.values(inputData);

        const placeholders = values.map((_, index) => `$${index + 1}`);

        const result = await this.client.query(
            `
                INSERT INTO "${this.tableName}" (${fields})
                VALUES (${placeholders})
            `,
            values
        );

        return !!result.rowCount;
    }
}
