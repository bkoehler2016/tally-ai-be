const db = require("../database/dbConfig.js");

const { insertBusiness } = require("./users-model.js");
const { biz1, biz2, biz3 } = require("../test_params/index.js");

describe("users-model", function() {
    describe("insertBusiness()", function() {
        beforeEach(async () => {
            await db.raw('TRUNCATE users RESTART IDENTITY CASCADE')
        });
        it("should insert a business", async function() {
            await insertBusiness(biz1)

        const businesses = await db("businesses");
        expect(businesses).toHaveLength(5);
        });

        it("should insert the provided business", async function() {
            await insertBusiness(biz2)
            await insertBusiness(biz3)

        const businesses = await db("businesses");

        expect(businesses).toHaveLength(5);
        expect(businesses[3].name).toBe("Biz2");
        expect(businesses[4].name).toBe("Biz3");
        });
    });
});