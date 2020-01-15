const db = require("../database/dbConfig.js");

const { insertBusiness } = require("./users-model.js");

describe("users-model", function() {
    describe("insertBusiness()", function() {
        beforeEach(async () => {
            await db("users").truncate();
        });
        it("should insert a business", async function() {
            await insertBusiness({ id: "3", name: "Biz", city: "Atlanta", state: "GA" })
        
        const businesses = await db("businesses");
        expect(businesses).toHaveLength(1);
        });

        it("should insert the provided business", async function() {
            await insertBusiness({ id: "3", name: "Biz", city: "Atlanta", state: "GA" })
            await insertBusiness({ id: "4", name: "Biz2", city: "Las Vegas", state: "NV" })
        
        const businesses = await db("businesses");

        expect(businesses).toHaveLength(2);
        expect(businesses[0].name).toBe("Biz");
        expect(businesses[1].name).toBe("Biz2");
        });
    });
});