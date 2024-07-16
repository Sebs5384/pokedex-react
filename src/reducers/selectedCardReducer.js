const initialSelectedCardState = {
    name: null,
    data: null
};

function selectedCardReducer(state = initialSelectedCardState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_SELECTED_CARD":
            return {
                ...state,
                name: payload
            };
        case "SET_CARD_DATA": 
            return {
                ...state,
                data: {
                    ...state.data,
                    previousEvolution: payload.species.evolves_from_species.name ? payload.species.evolves_from_species.name : "",
                    genus: payload.species.genera[7].genus,
                    name: payload.pokemon.name,
                    hp: payload.pokemon.stats[0].base_stat,
                    height: payload.pokemon.height,
                    weight: payload.pokemon.weight,
                    firstSkill: payload.pokemon.abilities[0].ability.name,
                    secondSkill: payload.pokemon.abilities[1].ability.name,
                    attack: payload.pokemon.stats[1].base_stat,
                    defense: payload.pokemon.stats[2].base_stat,
                    speed: payload.pokemon.stats[5].base_stat,
                    spAttack: payload.pokemon.stats[3].base_stat,
                    spDefense: payload.pokemon.stats[4].base_stat,
                    description: payload.species.flavor_text_entries[0].flavor_text,
                    id: payload.pokemon.id,
                    type: payload.pokemon.types[0].type.name
                }
            };
        case "RESET_CARD_DATA": 
            return {
                ...state,
                data: null
            };
        default:
            return state;
    };
};

export {
    initialSelectedCardState,
    selectedCardReducer
};