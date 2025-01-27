import { useState } from "react";

function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(key)

        if (persistedState) {
            return JSON.parse(persistedState)
        }

        return defaultValue
    })

    const setPersistedState = (value) => {
        setState(value)

        let serialisedValue

        // wtf is the purpose of this??
        if (typeof value === 'function') {
            serialisedValue = JSON.stringify(value(state))
        } else {
            serialisedValue = JSON.stringify(value)
        }

        localStorage.setItem(key, serializedValue);

        return [
            state,
            setPersistedState
        ]
    }
}

export default usePersistedState;