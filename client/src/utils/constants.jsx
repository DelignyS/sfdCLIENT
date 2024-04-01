export const HOST = process.env.NEXT_PUBLIC_SERVER_URL;
export const API_URL = `${HOST}/api`;
export const IMAGES_URL = `${HOST}/uploads`;

export const AUTH_ROUTES = `${API_URL}/auth`;
export const GIG_ROUTES = `${API_URL}/gigs`;
export const ORDERS_ROUTES = `${API_URL}/orders`;
export const MESSAGES_ROUTES = `${API_URL}/messages`;
export const DASHBOARD_DATA_ROUTES = `${API_URL}/dashboard`;

export const LOGIN_ROUTE = `${HOST}/auth/signin`;
export const SIGNUP_ROUTE = `${HOST}/auth/signup`;
export const SOCIAL_LOGIN_ROUTE = `${AUTH_ROUTES}/social-login`;
export const GET_USER_INFO = `${HOST}/users/me`;
export const SET_USER_INFO = `${HOST}/users`;
export const SET_USER_IMAGE = `${HOST}/users/upload`;

export const ADD_GIG_ROUTE = `${HOST}/gigs/create`;
export const GET_USER_GIGS_ROUTE = `${HOST}/gigs`;
export const GET_GIG_DATA = `${GIG_ROUTES}/get-gig-data`;
export const EDIT_GIG_DATA = `${HOST}/gigs`;
export const SEARCH_GIGS_ROUTE = `${GIG_ROUTES}/search-gigs`;
export const CHECK_USER_ORDERED_GIG_ROUTE = `${GIG_ROUTES}/check-gig-order`;
export const ADD_REVIEW = `${HOST}/reviews`;

export const CREATE_ORDER = `${HOST}/orders/create`;
export const ORDER_SUCCESS_ROUTE = `${HOST}/orders/confirm`;
export const GET_BUYER_ORDERS_ROUTE = `${HOST}/orders/buyer`;
export const GET_SELLER_ORDERS_ROUTE = `${HOST}/orders/seller`;

export const GET_MESSAGES = `${HOST}/get-messages`;
export const ADD_MESSAGE = `${HOST}/messages/`;
export const GET_UNREAD_MESSAGES = `${HOST}/messages/unread`;
export const MARK_AS_READ_ROUTE = `${HOST}/messages/read/`;

export const GET_SELLER_DASHBOARD_DATA = `${DASHBOARD_DATA_ROUTES}/seller`;
