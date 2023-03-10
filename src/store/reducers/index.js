import { combineReducers } from 'redux';
import nftReducer from './nfts';
import hotCollectionsReducer from './hotCollections';
import authorListReducer from './authorList';
import authorUserReducer from './authorUser';
import filterReducer from './filters';
import blogPostsReducer from './blogs';

export const rootReducer = combineReducers({
  NFT: nftReducer,
  hotCollection: hotCollectionsReducer,
  authors: authorListReducer,
  author: authorUserReducer,
  filters: filterReducer,
  blogs: blogPostsReducer
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;