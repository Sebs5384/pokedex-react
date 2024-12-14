import { renderHook, act } from "@testing-library/react";
import useHandleCard from "../useHandleCard";

describe("useHandleCard", () => {
    const initialProps = {
        setSelectedCard: jest.fn(),
        loadingCardData: false,
        loadingSpeciesData: false,
        cardData: null,
        loadingSprite: false,
        cardSprite: null,
        cardError: null,
        cardSpeciesError: null
    };

    it("Should call setSelectedCard when handleSelectedCard is called", async () => {
        const { result } = renderHook(() => useHandleCard(
            initialProps.setSelectedCard,
            initialProps.loadingCardData,
            initialProps.loadingSpeciesData,
            initialProps.cardData,
            initialProps.loadingSprite,
            initialProps.cardSprite,
            initialProps.cardError,
            initialProps.cardSpeciesError
        ));

        act(() => {
            result.current.handleSelectedCard({ name: "testmeleon" });
        });

        expect(initialProps.setSelectedCard).toHaveBeenCalledTimes(1);
        expect(initialProps.setSelectedCard).toHaveBeenCalledWith({ name: "testmeleon" });
    });

    it("Should dispatch the modal visibility to false and setSelectedCard to null when handleCloseCard is called", async () => {
        const { result } = renderHook(() => useHandleCard(
            initialProps.setSelectedCard,
            initialProps.loadingCardData,
            initialProps.loadingSpeciesData,
            initialProps.cardData,
            initialProps.loadingSprite,
            initialProps.cardSprite,
            initialProps.cardError,
            initialProps.cardSpeciesError
        ));
        
        act(() => {
            result.current.handleCloseCard();
        });

        expect(initialProps.setSelectedCard).toHaveBeenCalledTimes(1);
        expect(initialProps.setSelectedCard).toHaveBeenCalledWith(null);
        expect(result.current.modalVisibility).toBe(false);
    });

    it("Should dispatch the loading state to false when there's either a cardError, cardSpeciesError or no cardData", async () => {
        const { result, rerender } = renderHook(
            (props) => useHandleCard(
                props.setSelectedCard,
                props.loadingCardData,
                props.loadingSpeciesData,
                props.cardData,
                props.loadingSprite,
                props.cardSprite,
                props.cardError,
                props.cardSpeciesError
            ),
            {
                initialProps: initialProps,
            }
        );

        expect(result.current.loadingCard).toBe(false);
        rerender({
            ...initialProps,
            cardData: {},
        });
        
        expect(result.current.loadingCard).toBe(false);
    });

    it("Should dispatch the loading state to false and modal visibility to true when the cardData fetching is successful", async () => {
        const { result, rerender } = renderHook(
            (props) => useHandleCard(
                props.setSelectedCard,
                props.loadingCardData,
                props.loadingSpeciesData,
                props.cardData,
                props.loadingSprite,
                props.cardSprite,
                props.cardError,
                props.cardSpeciesError
            ),
            {
                initialProps: initialProps,
            }
        );

        expect(result.current.loadingCard).toBe(false);
        rerender({
            ...initialProps,
            loadingCardData: false,
            loadingSpeciesData: false,
            loadingSprite: false,
            cardData: { name: "testmeleon" },
            cardSprite: { current: "some-random.png", previous: null }
        });

        expect(result.current.loadingCard).toBe(false);
        expect(result.current.modalVisibility).toBe(true);
    });

    it("Should set the state loadingCard to true when the cardData fetching is in progress", async () => {
        const { result, rerender } = renderHook(
            (props) => useHandleCard(
                props.setSelectedCard,
                props.loadingCardData,
                props.loadingSpeciesData,
                props.cardData,
                props.loadingSprite,
                props.cardSprite,
                props.cardError,
                props.cardSpeciesError
            ), {
                initialProps: initialProps,
            }
        );

        expect(result.current.loadingCard).toBe(false);
        rerender({
            ...initialProps,
            loadingCardData: true
        });
        
        expect(result.current.loadingCard).toBe(true);
        expect(result.current.loadingCardText).toBe("Loading...");
    });
});