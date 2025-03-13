function setItemRange(itemNumber, currentItem) {
    if(itemNumber === undefined || currentItem === undefined) return;

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
    if(array === undefined || item === undefined) return;
    
    const nextIndex = array.findIndex((index) => index === null);
    if(nextIndex !== -1) {
        const updatedArray = [...array];
        updatedArray[nextIndex] = item;
        return updatedArray;
    };

    return array;
};

function validateSearchboxPage(page, totalPages) {
    if (/^$/.test(page)) return "This field cannot be empty";
    if (!/^[^A-Z-a-z]+$/.test(page)) return "Only numeric characters are allowed";
    if (page > totalPages.length) return `Page Nº${page} does not exist, only ${totalPages.length} out there`;
    if (page === '0') return "There's no such thing as page 0, go catch a pokemon instead !";
    if (page === 0) return "Page Nº 0 does not exists, go catch a pokemon instead !";
  
    return true;
};

function levenshteinDistance(sourceString, targetString) {
    const distanceMatrix = [];
    const sourceLength = sourceString.length;
    const targetLength = targetString.length;

    if(sourceLength === 0) return targetLength;
    if(targetLength === 0) return sourceLength;

    for(let rowIndex = 0; rowIndex <= sourceLength; rowIndex++) {
        distanceMatrix[rowIndex] = [rowIndex];
    };

    for(let columnIndex = 0; columnIndex <= targetLength; columnIndex++) {
        distanceMatrix[0][columnIndex] = columnIndex;
    };

    for(let rowIndex = 1; rowIndex <= sourceLength; rowIndex++) {
        const sourceCharacter = sourceString[rowIndex - 1];

        for(let columnIndex = 1; columnIndex <= targetLength; columnIndex++) {
            const targetCharacter = targetString[columnIndex - 1];
            const substitutionCost = (sourceCharacter === targetCharacter) ? 0 : 1;

            distanceMatrix[rowIndex][columnIndex] = Math.min(
                distanceMatrix[rowIndex - 1][columnIndex] + 1,
                distanceMatrix[rowIndex][columnIndex - 1] + 1,
                distanceMatrix[rowIndex - 1][columnIndex - 1] + substitutionCost
            )
        };
    };

    return distanceMatrix[sourceLength][targetLength];
};

const handleProximitySearch = (query, items) => {
    const threshold = 3;
    
    if(!query) return items;

    const lowerCaseQuery = query.toLowerCase();
    const exactOrPartialMatches = [];
    const fuzzyMatches = [];

    items?.forEach((item) => {
        const lowerCaseItem = item.toLowerCase();

        if(lowerCaseItem.includes(lowerCaseQuery)) {
            exactOrPartialMatches.push(item);
        } else if(levenshteinDistance(lowerCaseQuery, lowerCaseItem) <= threshold) {
            fuzzyMatches.push(item);
        };
    });

    return [...exactOrPartialMatches, ...fuzzyMatches];
};

export {
    setItemRange,
    convertDecimeterToFeet,
    convertGramToLb,
    randomizeNumber,
    replaceNullItem,
    validateSearchboxPage,
    handleProximitySearch,
};