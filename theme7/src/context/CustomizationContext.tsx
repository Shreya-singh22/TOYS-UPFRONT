"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useStoreCustomization } from '../lib/api';

const CustomizationContext = createContext<any>(undefined);

export function CustomizationProvider({ children }: { children: ReactNode }) {
    const storeData = useStoreCustomization();

    return (
        <CustomizationContext.Provider value={storeData}>
            {children}
        </CustomizationContext.Provider>
    );
}

export function useCustomization() {
    const context = useContext(CustomizationContext);
    if (context === undefined) {
        throw new Error('useCustomization must be used within a CustomizationProvider');
    }
    return context;
}
