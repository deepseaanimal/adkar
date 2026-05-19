import { createContext, useContext, useReducer } from 'react';
import { loadData, saveData } from '../data/storage.js';

const AppContext = createContext(null);

const initialState = {
  page: 'home',
  params: {},
  data: loadData(),
};

function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, page: action.page, params: action.params || {} };

    case 'SAVE_CHANGE_SETUP': {
      const data = JSON.parse(JSON.stringify(state.data));
      const idx = data.initiatives.findIndex((i) => i.id === action.initiativeId);
      data.initiatives[idx] = { ...data.initiatives[idx], ...action.changeData };
      saveData(data);
      return { ...state, data };
    }

    case 'SAVE_ASSESSMENT': {
      const data = JSON.parse(JSON.stringify(state.data));
      const idx = data.initiatives.findIndex((i) => i.id === action.initiativeId);
      const assessment = { ...action.assessment, lastUpdated: new Date().toISOString() };
      if (action.assessmentIndex != null) {
        data.initiatives[idx].assessments[action.assessmentIndex] = assessment;
      } else {
        data.initiatives[idx].assessments.push(assessment);
      }
      saveData(data);
      return { ...state, data };
    }

    case 'DELETE_ASSESSMENT': {
      const data = JSON.parse(JSON.stringify(state.data));
      const idx = data.initiatives.findIndex((i) => i.id === action.initiativeId);
      data.initiatives[idx].assessments.splice(action.assessmentIndex, 1);
      saveData(data);
      return { ...state, data };
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function navigate(page, params = {}) {
    dispatch({ type: 'NAVIGATE', page, params });
    window.scrollTo(0, 0);
  }

  function getInitiative(id) {
    return state.data.initiatives.find((i) => i.id === id);
  }

  return (
    <AppContext.Provider value={{ state, dispatch, navigate, getInitiative }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
