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
}
