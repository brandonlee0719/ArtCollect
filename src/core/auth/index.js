import { isEmpty } from 'lodash';
import api from '../api';

const TOKEN_KEY = 'jwtToken';
const USER_INFO = 'userInfo';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  clearUserInfo(userInfo = USER_INFO) {
    return auth.clear(userInfo);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  getUserInfo(userInfo = USER_INFO) {
    return auth.get(userInfo);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value, key, isLocalStorage) {
    if (isEmpty(value)) {
      return null;
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },

  setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
    return auth.set(value, tokenKey, isLocalStorage);
  },

  setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
    return auth.set(value, userInfo, isLocalStorage);
  },
};

export const loginUrl = `${api.baseUrl}/api/auth/local`;
export const registerUrl = `${api.baseUrl}/api/auth/local/register`;
export const postAuthorUrl = `${api.baseUrl}/api/authors`;
export const authorUrl = (authorId) => `${api.baseUrl}/api/authors/${authorId}`;
// export const apiKey = '6fa5e2e2e1cb2e82538a55989195a635001e58567a505875dd1cb905f3d55257b6ff9201eaebc4e8267c53e990a1f881a1aab23c3b317fdacb9cb5a2db39c5bb382f1f1a0ccdade08e3bbfadccc9139a8ee80190d141af208e431cebb47dacc94c516e380fe3219ed04f7c485c69dca80a26dbe4b3923309ff8bcde247e53512';
export const apiKey = '3b730e0301cb0f922ab94aacea4f631f1af87113108f96e0727bacaacf9fa4d18faff3ab74b04094254b374e50befcb059789e20df174dc957e8f1291de7d48812ada4d4ef3e60fcb1d3bb690a040ec63832d56a191d36e4c3837b84fc008d64080a8605870d310558fb571568fefa4a79e2200de9862f40860569c6be1933a1';

export default auth;