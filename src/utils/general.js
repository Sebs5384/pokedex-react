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

export {
    setItemRange,
    convertDecimeterToFeet,
    convertGramToLb,
};