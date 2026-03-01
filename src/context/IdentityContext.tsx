import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserPersona = 'general' | 'office' | 'merchant' | 'parent' | 'student' | 'slashie';

interface IdentityContextType {
    persona: UserPersona;
    setPersona: (p: UserPersona) => void;
}

const IdentityContext = createContext<IdentityContextType | undefined>(undefined);

export const IdentityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [persona, setPersonaState] = useState<UserPersona>('general');

    useEffect(() => {
        const saved = localStorage.getItem('dee_user_persona') as UserPersona;
        if (saved) setPersonaState(saved);
    }, []);

    const setPersona = (p: UserPersona) => {
        setPersonaState(p);
        localStorage.setItem('dee_user_persona', p);
    };

    return (
        <IdentityContext.Provider value={{ persona, setPersona }}>
            {children}
        </IdentityContext.Provider>
    );
};

export const useIdentity = () => {
    const context = useContext(IdentityContext);
    if (!context) throw new Error('useIdentity must be used within IdentityProvider');
    return context;
};
