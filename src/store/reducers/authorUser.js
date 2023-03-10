import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  authorUser: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getAuthorUser.request):
      return { ...state, authorUser: entityLoadingStarted(state.authorUser, action.payload) };
    case getType(actions.getAuthorUser.success):
      return { ...state, authorUser: entityLoadingSucceeded(state.authorUser, action.payload) };
    case getType(actions.getAuthorUser.failure):
      return { ...state, authorUser: entityLoadingFailed(state.authorUser) };
    
    default:
      return state;
  }
};

export default states;
