import { v4 as uuidv4 } from 'uuid';

const ROOMS_DATA = Array(15)
  .fill(null)
  .map((x, i) => ({
    id: uuidv4(),
    cost: Math.floor(Math.random() * 22) + 1,
    isReserved: false,
    roomNumber: i,
  }));

const USER_DATA = {
  firstname: 'Devtools',
  lastname: 'Tech',
  credits: Math.floor(Math.random() * 15) + 10,
};

export const fetchRoomsDetails = () => {
  return new Promise((resolve) => setTimeout(() => resolve(ROOMS_DATA), 1000));
};

export const fetchUserDetails = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(USER_DATA), 1000));
};
