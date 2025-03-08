import axios from 'axios';

const BASE_URL = 'https://apis.ccbp.in/list-creation';

export const fetchLists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/lists`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch lists');
  }
};