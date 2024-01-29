import {API_BASE_URL} from '../api/api';

export const GOALCONTROLL = (goalId?: number) =>
  API_BASE_URL + `/goal${goalId ? `/${goalId}` : ''}`;
