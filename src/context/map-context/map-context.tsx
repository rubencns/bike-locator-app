import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type Action = { type: string; payload: any };

interface State {
  hideDetails: boolean;
}

const initialValue = {
  hideDetails: true,
};

export const mapContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({ state: initialValue, dispatch: () => null });

export const useMapContext = () => useContext(mapContext);

export const hideDetails: any = (isHidden: boolean) => ({
  type: 'HIDE_DETAILS',
  payload: { isHidden },
});

const reducer = (state: State = initialValue, action: Action) => {
  const { isHidden } = action.payload;

  switch (action.type) {
    case 'HIDE_DETAILS':
      return { ...state, hideDetails: isHidden };
    default:
      return state;
  }
};

const MapContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const value = {
    state,
    dispatch,
  };

  return <mapContext.Provider value={value}>{children}</mapContext.Provider>;
};

export default MapContextProvider;
