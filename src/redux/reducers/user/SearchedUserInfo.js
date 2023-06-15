import * as Actions from '../../Enums';

const initialState = {
  isLoading: false,
  searchedUserProfile: null,
};

export function searchedUserInfoReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.SEARCH_USER_PROFILE_START:
      return {...state, isLoading: true};

    case Actions.SEARCH_USER_PROFILE_SUCCESS:
      let updatedProfiles = {
        ...state.searchedUserProfile,
        [action.data.id]: action.data,
      };

      const profileIds = Object.keys(updatedProfiles);

      if (profileIds.length > 10) {
        const oldestProfileId = profileIds[0];
        // Remove the oldest profile
        delete updatedProfiles[oldestProfileId];
      }
      return {
        ...state,
        searchedUserProfile: updatedProfiles,
        isLoading: false,
      };

    default:
      return state;
  }
}
