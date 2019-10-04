const { przeliczCzasTestu } = require('../../utils/sendTestResults');
const { expect } = require("chai");

describe("sendTestResults - returning formated time of test duration", () => {
    it("returns formated time as string `mm:ss [min:sek]`", () => {
        const obiektWynikówTestu = {};
        obiektWynikówTestu.wykorzystanyCzas = { minuty: 15, sekundy: 9 }

        expect(przeliczCzasTestu(obiektWynikówTestu)).to.equals("15:09 [min:sek]");
    });

})