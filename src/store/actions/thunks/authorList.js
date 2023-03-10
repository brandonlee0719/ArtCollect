import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';
import request from '../../../core/auth/request';
import { apiKey, postAuthorUrl } from '../../../core/auth';

export const fetchAuthorList = (authorId) => async (dispatch) => {
  dispatch(actions.getAuthorList.request(Canceler.cancel));

  try {
    let filter = authorId ? 'filters[id]=' + authorId : '';
    const { data } = await Axios.get(`${api.baseUrl}${api.authors}?${filter}`, {
      cancelToken: Canceler.token,
      params: {}
    });
    dispatch(actions.getAuthorList.success(data.data.attributes.results));
  } catch (err) {
    dispatch(actions.getAuthorList.failure(err));
  }
};

export const fetchAuthorListWallet = (wallet) => async (dispatch) => {
  dispatch(actions.getAuthorUser.request(Canceler.cancel));

  try {
    let filter = wallet ? 'filters[wallet]=' + wallet : '';
    const { data } = await Axios.get(`${api.baseUrl}${api.authors}?${filter}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    if (!data.data.attributes.results[0]) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + apiKey
        }
      }
      let authorData = {
        "data": {
          "username": "ArtCollector",
          "wallet": localStorage.getItem('wallet')
        }
      }
      await request(postAuthorUrl, { method: 'POST', body: authorData, config })
    }

    dispatch(actions.getAuthorUser.success(data.data.attributes.results[0]));
  } catch (err) {
    dispatch(actions.getAuthorUser.failure(err));
  }
};

export const fetchAuthorRanking = () => async (dispatch) => {

  dispatch(actions.getAuthorRanking.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.authorsSales}`, {
      cancelToken: Canceler.token,
      params: {}
    });
    dispatch(actions.getAuthorRanking.success(data.data.attributes.results));
  } catch (err) {
    dispatch(actions.getAuthorRanking.failure(err));
  }
};
