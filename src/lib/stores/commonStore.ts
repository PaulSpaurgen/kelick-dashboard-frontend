import { writable } from 'svelte/store';

const createNavStore = () => {
    // Get initial value from localStorage or use default
    const storedValue = typeof window !== 'undefined' 
        ? JSON.parse(localStorage.getItem('navState') || '{"isViewMore": false}')
        : { isViewMore: false };

    const { subscribe, set, update } = writable(storedValue);

    // Subscribe to store changes and update localStorage
    subscribe(value => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('navState', JSON.stringify(value));
        }
    });

    return {
        subscribe,
        set,
        update,
        toggleViewMore: () => update(state => ({ ...state, isViewMore: !state.isViewMore }))
    };
};

const createExcelLoadingStore = () => {
    const { subscribe, set, update } = writable({
        isExcelLoading: false,
        generateCelebs: false
    });
    return {
        subscribe,
        set,
        update,
    };
};


export const navStore = createNavStore();
export const excelLoadingStore = createExcelLoadingStore();

