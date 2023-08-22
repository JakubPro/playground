import {randomUUID} from 'crypto';

export type User = {
  id: string;
  username: string;
};

export type CreateUserCommand = {
  username: string;
}

const userStore: Record<string, User> = {};

export const isUsernameAvailable = (username: string) => {
  const users = Object.values(userStore);
  return !users.some((user) => user.username === username);
}
export const createUser = (payload: CreateUserCommand, username: string) => {
  const id = randomUUID();

  if (!isUsernameAvailable(username)) {
    throw new Error(`Username '${username}' is already taken`);
  }

  userStore[id] = {
    id,
    username: payload.username,
  };
};

export const listUsers = () => {
  const userStoreArray = userStore;
  Object.assign([], userStoreArray);
  return userStoreArray;
}

export const deleteUser = (userId: string) => {
  delete userStore[userId];
}

export const giveUserById = (userId: string) => {
  return userStore[userId];
}


