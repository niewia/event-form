import resourcesService from '../../services/resources.service';

export const setCategories = payload => ({
    type: 'SET_CATEGORIES',
    payload
})

export const setCoordinators = payload => ({
    type: 'SET_COORDINATORS',
    payload
})

export const fetchCategories = () => {
    return function (dispatch) {
        return resourcesService.getCategories().then(
            result => {
                return dispatch(setCategories(result))
            }
        )
    };
}

export const fetchCoordinators = () => {
    return function (dispatch) {
        return resourcesService.getCoordinators().then(
            result => dispatch(setCoordinators(result))
        )
    };
}