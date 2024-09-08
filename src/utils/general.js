function setItemRange(itemNumber, currentItem) {
    const ITEM_RANGE_START_OFFSET = 2;
    const ITEM_RANGE_END_OFFSET = 2;
    const isInRange = !(itemNumber >= currentItem - ITEM_RANGE_START_OFFSET && itemNumber <= currentItem + ITEM_RANGE_END_OFFSET);

    return isInRange;
};

function convertGramToLb(grams) {
    return (grams * 0.00220462).toFixed(2);
};
  
function convertDecimeterToFeet(meters) {
    return (meters * 0.328084).toFixed(2).replace('.', "'");
};

function randomizeNumber(number) {
    return Math.floor(Math.random() * number);
};

function replaceNullItem(array, item) {
    const nextIndex = array.findIndex((index) => index === null);
    if(nextIndex !== -1) {
        const updatedArray = [...array];
        updatedArray[nextIndex] = item;
        return updatedArray;
    };
};

export {
    setItemRange,
    convertDecimeterToFeet,
    convertGramToLb,
    randomizeNumber,
    replaceNullItem,
};