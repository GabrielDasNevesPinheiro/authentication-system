import { RootState } from "./store";

export const loadState = () => {
    try {
        const savedState = localStorage.getItem('auth');

        if(savedState === null) {
            return '';
        }

        return savedState;

    } catch(err) {
        return '';
    }
};

export const saveState = (state: RootState) => {
    try {
        localStorage.setItem('auth', state.auth.value);
    } catch (err) {

    }
};