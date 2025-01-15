import { renderHook, act, waitFor } from "@testing-library/react";
import useTotalPages from "../useTotalPages";

describe("useTotalPages", () => {
    const itemsPerPage = 10;
    const items = { count: 50 };

    it("Should set the total pages as a side effect by invoking setTotalPages", async () => {
        const { result } = renderHook(() => useTotalPages(itemsPerPage, items));
        
        expect(result.current.totalPages).toEqual([1, 2, 3, 4, 5]);
        expect(result.current.firstPage).toEqual(1);
        expect(result.current.lastPage).toEqual(5);        
    });
    
    it("Should set the total pages to 1 when the items count is less than the items per page", async () => {
        const { result } = renderHook(() => useTotalPages(itemsPerPage, { count: 9 }));
        
        expect(result.current.totalPages).toEqual([1]);
        expect(result.current.firstPage).toEqual(1);
        expect(result.current.lastPage).toEqual(1);
    });
});