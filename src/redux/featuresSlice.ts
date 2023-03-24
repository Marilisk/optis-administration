import { createSlice } from "@reduxjs/toolkit";
import { FeaturesInitialStateType } from "../types/types";


const initialState: FeaturesInitialStateType = {
    filters: {
        options: [
            { id: 1, name: 'Мужские' }, { id: 2, name: 'Женские' }, { id: 3, name: 'Детские' }, { id: 4, name: 'Все' }],
        chosenOption: { id: 4, name: 'Все' },
    },

    sortTags: {
        tags: [
            { id: 1, label: 'по дате публикации', name: 'byRelevance' },
            { id: 2, label: 'по убыванию цены', name: 'priceHighToLow' },
            { id: 3, label: 'по увеличению цены', name: 'priceLowToHigh' },
            { id: 4, label: 'по увеличению в наличии', name: 'UpStock' },
            { id: 5, label: 'по убыванию в наличии', name: 'DownStock' },
            /* { id: 6, label: 'по возрастанию в наличии', name: 'DownStock' }, */
            { id: 7, label: 'по количеству просмотров', name: 'popular' },
        ],
        chosenTagId: 1,
    },

}

const featuresSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        selectFilter(state, action) {
            state.filters.chosenOption = action.payload
        },
        setSortTag(state, action) {
            state.sortTags.chosenTagId = action.payload
        },
    },
})

export const { selectFilter, setSortTag } = featuresSlice.actions;
export default featuresSlice.reducer;