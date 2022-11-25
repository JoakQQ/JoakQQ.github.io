import { createContext, Dispatch, useReducer } from 'react'

export interface GlobalState {
  pageName: string
  headerName: string
}

const initGlobalState: GlobalState = {
  pageName: '',
  headerName: '',
}

export type GlobalActionType =
  | {
      type: 'changePageName'
      pageName: string
    }
  | {
      type: 'changeTitle'
      title: string
    }

export const GlobalContext = createContext<{
  state: GlobalState
  globalDispatch: Dispatch<GlobalActionType>
}>({
  state: initGlobalState,
  globalDispatch: () => undefined,
})

export function GlobalReducer(state: GlobalState, action: GlobalActionType) {
  switch (action.type) {
    case 'changePageName': {
      return {
        ...state,
        pageName: action.pageName,
      }
    }
    case 'changeTitle': {
      return {
        ...state,
        headerName: action.title,
      }
    }
    default: {
      console.error('wrong action type')
      return { ...state }
    }
  }
}

export const GlobalProvider = (props: { children: any }) => {
  const [state, globalDispatch] = useReducer(GlobalReducer, initGlobalState)

  return (
    <GlobalContext.Provider
      value={{
        state,
        globalDispatch,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}
