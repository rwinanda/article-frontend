import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
    navbar: string;
    logoImage: string;
    fontColor: string;
}

const initialState: NavbarState = {
    navbar: '',
    logoImage: '/images/logoipsum-white.png',
    fontColor: 'text-white',
};

const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setNavbarBgScroll(state, action: PayloadAction<NavbarState>) {
            return { ...state, ...action.payload };
        },
    },
});

export const { setNavbarBgScroll } = navbarSlice.actions;
export default navbarSlice.reducer;
