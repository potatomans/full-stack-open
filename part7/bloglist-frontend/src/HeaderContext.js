import { createContext, useContext, useReducer } from "react"

export const HeaderReducer = (state, action) => {
    switch (action.type) {
        case "MESSAGE":
            return action.payload
        case "CLEAR":
            return null
        default: return state
    }
}

export const LoginReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return null
        default: return state
    }
}

const HeaderContext = createContext()

export const HeaderContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(HeaderReducer, null)
    const [status, statusDispatch] = useReducer(LoginReducer, null)

    return (
        <HeaderContext.Provider value={[message, messageDispatch, status, statusDispatch]}>
            {props.children}
        </HeaderContext.Provider>
    )
}

export const useHeaderReducer = () => {
    const headerContext = useContext(HeaderContext)
    return [headerContext[0], headerContext[1]]
}

export const useLoginReducer = () => {
    const headerContext = useContext(HeaderContext)
    return [headerContext[2], headerContext[3]]
}

export default HeaderContext

