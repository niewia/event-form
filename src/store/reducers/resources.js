const initialState = {
  titles: [],
  coordinators: [],
  categories: []
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'SET_COORDINATORS':
      return { ...state, coordinators: action.payload }
    default:
      return state
  }
}

export default events
