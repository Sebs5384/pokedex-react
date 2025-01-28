<reference types="Jest" />

import {
    setItemRange,
    convertDecimeterToFeet,
    convertGramToLb,
    randomizeNumber,
    replaceNullItem,
    validateSearchboxPage,
} from '../general';

describe("setItemRange", () => {
    it("Should return true if the item is out of range", () => {
        const itemNumber = 1;
        const currentItem = 10;
        const isInRange = setItemRange(itemNumber, currentItem);

        expect(isInRange).toBe(true);
    });

    it("Should return false if the item is in range", () => {
        const itemNumber = 1;
        const currentItem = 1;
        const isInRange = setItemRange(itemNumber, currentItem);

        expect(isInRange).toBe(false);
    });

    it("Should return undefined if the items are undefined", () => {
        const itemNumber = undefined;
        const currentItem = null;
        const isInRange = setItemRange(itemNumber, currentItem);
        
        expect(isInRange).toBe(undefined);
    })
});

describe("convertGramToLb", () => {
    it("Should convert grams to lbs", () => {
        const grams = 1000;
        const lbs = convertGramToLb(grams);

        expect(lbs).toBe("2.20");
    });

    it("Should return NaN if the grams is not a number", () => {
        const grams = undefined;
        const lbs = convertGramToLb(grams);

        expect(lbs).toEqual("NaN");
    });

    it("Should handle float values", () => {
        const grams = 0.999;
        const lbs = convertGramToLb(grams);

        expect(lbs).toBe("0.00");
    });
});

describe("convertDecimeterToFeet", () => {
    it("Should convert decimeters to feet", () => {
        const decimeters = 10;
        const feet = convertDecimeterToFeet(decimeters);

        expect(feet).toBe("3'28");
    });

    it("Should return NaN if the decimeters is not a number", () => {
        const decimeters = undefined;
        const feet = convertDecimeterToFeet(decimeters);

        expect(feet).toEqual("NaN");
    });

    it("Should handle float values", () => {
        const decimeters = 0.999;
        const feet = convertDecimeterToFeet(decimeters);

        expect(feet).toBe("0'33");
    });
});

describe("randomizeNumber", () => {
    it("Should randomize a number", () => {
        const number = 10;
        const randomizedNumber = randomizeNumber(number);
        
        expect(randomizedNumber).toBeLessThanOrEqual(number);
    });

    it("Should return 0 if the number is 0", () => {
        const number = 0;
        const randomizedNumber = randomizeNumber(number);
        
        expect(randomizedNumber).toEqual(0);
    });

    it("Should return NaN if the number is not a number", () => {
        const number = undefined;
        const randomizedNumber = randomizeNumber(number);
        
        expect(randomizedNumber).toEqual(NaN);
    });

    it("Should still randomize if the number is a float", () => {
        const number = 4.4;
        const randomizedNumber = randomizeNumber(number);
        
        expect(randomizedNumber).toBeLessThanOrEqual(number);
    });
});

describe("replaceNullItem", () => {
    it("Should replace a null item", () => {
        const array = [1, null, null,];
        const item = 2;
        const updatedArray = replaceNullItem(array, item);

        expect(updatedArray).toEqual([1, 2, null]);
    });

    it("Should return the same array if there's no null items to replace", () => {
        const array = [1, 2, 3,];
        const item = 4;
        const updatedArray = replaceNullItem(array, item);

        expect(updatedArray).toEqual([1, 2, 3]);
    });

    it("Should return an empty array if the array is empty", () => {
        const array = [];
        const item = 4;
        const updatedArray = replaceNullItem(array, item);

        expect(updatedArray).toEqual([]);
    });

    it("Should return undefined if the array is undefined", () => {
        const array = undefined;
        const item = 4;
        const updatedArray = replaceNullItem(array, item);        
        
        expect(updatedArray).toBe(undefined);
    });

    it("Should return undefined if the item is undefined", () => {
        const array = [1, 2, 3,];
        const item = undefined;
        const updatedArray = replaceNullItem(array, item);        
        
        expect(updatedArray).toBe(undefined);
    });
});

describe("validatePageSearchbox", () => {
    it("Should validate the page in the searchbox", () => {
        const page = 1;
        const totalPages = [1, 2, 3,];
        const validPage = validateSearchboxPage(page, totalPages);

        expect(validPage).toBe(true);
    });

    it("Should return an error message if the page is not valid", () => {
        const pages = ["", "dsadas", "5", "0", 0];
        const totalPages = [1, 2, 3, 4];
        const invalidPages = pages.map((page) => validateSearchboxPage(page, totalPages));

        expect(invalidPages[0]).toBe("This field cannot be empty");
        expect(invalidPages[1]).toBe("Only numeric characters are allowed");
        expect(invalidPages[2]).toBe("Page Nº5 does not exist, only 4 out there");
        expect(invalidPages[3]).toBe("There's no such thing as page 0, go catch a pokemon instead !");
        expect(invalidPages[4]).toBe("Page Nº 0 does not exists, go catch a pokemon instead !");
    });
});