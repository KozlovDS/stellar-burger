import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    sortingConstructor: (state, action) => {
      const { positionA, positionB } = action.payload;
      state.ingredients[positionA] = state.ingredients.splice(
        positionB,
        1,
        state.ingredients[positionA]
      )[0];
    },
    clearConstructor: () => initialState
  },
  selectors: {
    selectConstructorsItems: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { selectConstructorsItems } = burgerConstructorSlice.selectors;
export const {
  addToConstructor,
  removeFromConstructor,
  sortingConstructor,
  clearConstructor
} = burgerConstructorSlice.actions;
