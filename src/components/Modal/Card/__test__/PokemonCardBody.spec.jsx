import { render, screen, within } from "@testing-library/react";
import PokemonCardBody from "../PokemonCardBody";
import "@testing-library/jest-dom";

describe("PokemonCardBody", () => {
    const selectedCard = {
        name: "testmeleon",
        height: "1",
        weight: "2",
        stats: {
            hp: "3",
            atk: "4",
            def: "5",
            spAtk: "6",
            spDef: "7",
            speed: "8"
        },
        skills: {
            firstSkill: "SOLID",
            secondSkill: "DRY"
        },
        typeImage: {
            mainTypeLogo: "mock-main-type-logo.png",
            secondaryTypeLogo: "mock-secondary-type-logo.png",
            mainTypeIcon: "mock-main-type-icon.png",
        },
        backgroundStyle: "some-background",
    };
    const pokemonSprite = {
        current: "mock-sprite.png",
        previous: null
    };
    
    it("Should render PokemonCardBody correctly", () => {
        render(<PokemonCardBody selectedCard={selectedCard} pokemonSprite={pokemonSprite} />);

        const cardBody = screen.getByTestId("pokemon-card-body");
        const cardImageSection = screen.getByTestId("pokemon-card-modal-image-section");
        const cardBannerSection = screen.getByTestId("pokemon-card-banner-section");
        const cardSkillSection = screen.getByTestId("pokemon-card-skill-section");
        const cardStatsSection = screen.getByTestId("pokemon-card-stats-section");

        expect(cardBody).toBeInTheDocument();
        expect(cardImageSection).toBeInTheDocument();
        expect(cardBannerSection).toBeInTheDocument();
        expect(cardSkillSection).toBeInTheDocument();
        expect(cardStatsSection).toBeInTheDocument();

        const imageSectionImage = within(cardImageSection).getByRole("img");
        const imageBackground = within(cardImageSection).getByAltText("testmeleon");

        expect(imageSectionImage).toHaveAttribute("src", "mock-sprite.png");
        expect(imageBackground).toHaveStyle("background: some-background");

        const bannerLogos = within(cardBannerSection).getAllByRole("img");
        const bannerLength = within(cardBannerSection).getByText('Length: 1"');
        const bannerWeight = within(cardBannerSection).getByText("Weight: 2 lbs");

        expect(bannerLogos[0]).toHaveAttribute("src", "mock-main-type-logo.png");
        expect(bannerLogos[1]).toHaveAttribute("src", "mock-secondary-type-logo.png");
        expect(bannerLength).toHaveTextContent("1");
        expect(bannerWeight).toHaveTextContent("2");

        const skillSectionIcons = within(cardSkillSection).getAllByRole("img");
        const firstSkillText = within(cardSkillSection).getByText("SOLID");
        const secondSkillText = within(cardSkillSection).getByText("DRY");
        
        expect(skillSectionIcons[1]).toHaveAttribute("src", "mock-main-type-icon.png");
        expect(skillSectionIcons[2]).toHaveAttribute("src", "mock-main-type-icon.png");
        expect(firstSkillText).toHaveTextContent("SOLID");
        expect(secondSkillText).toHaveTextContent("DRY");

        const atkText = within(cardStatsSection).getByText("4");
        const defText = within(cardStatsSection).getByText("5");
        const spAtkText = within(cardStatsSection).getByText("6");
        const spDefText = within(cardStatsSection).getByText("7");
        const speedText = within(cardStatsSection).getByText("8");

        expect(atkText).toHaveTextContent("4");
        expect(defText).toHaveTextContent("5");
        expect(spAtkText).toHaveTextContent("6");
        expect(spDefText).toHaveTextContent("7");
        expect(speedText).toHaveTextContent("8");
    });
});