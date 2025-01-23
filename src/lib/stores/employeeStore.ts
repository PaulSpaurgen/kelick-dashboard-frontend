import type { Employee } from '$lib/utills/Types/employeeTypes';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'employeeStore';

function getStoredEmployees(): Employee[] {
    if (!browser) return [];
    
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading employees from localStorage:', error);
        return [];
    }
}

function createEmployeeStore() {
    // Initialize with empty array during SSR
    const initialValue = browser ? getStoredEmployees() : [];
    const { subscribe, set, update } = writable<Employee[]>(initialValue);

    if (browser) {
        // Only set up localStorage subscription in browser environment
        subscribe(employees => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
            } catch (error) {
                console.error('Error saving employees to localStorage:', error);
            }
        });
    }

    return {
        subscribe,
        add: (employees: Employee[]) => update(store => [...store, ...employees]),
        set,
        reset: () => {
            set([]);
            if (browser) localStorage.removeItem(STORAGE_KEY);
        }
    };
}

export const employeeStore = createEmployeeStore();


