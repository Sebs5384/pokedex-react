function setItemRange(itemNumber, currentItem) {
    const ITEM_RANGE_START_OFFSET = 2;
    const ITEM_RANGE_END_OFFSET = 2;
    const isInRange = !(itemNumber >= currentItem - ITEM_RANGE_START_OFFSET && itemNumber <= currentItem + ITEM_RANGE_END_OFFSET);

    return isInRange;
};

export {
    setItemRange
};