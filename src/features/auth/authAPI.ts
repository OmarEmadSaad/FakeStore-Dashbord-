import { User } from "../../types";

const USERS_KEY = "mockUsers";
const USER_ID_KEY = "userId";

export const getMockUsers = (): User[] => {
  const str = localStorage.getItem(USERS_KEY);
  return str ? JSON.parse(str) : [];
};

const saveMockUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginAPI = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<User> => {
  const users = getMockUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) throw new Error("Invalid username or password");

  localStorage.setItem(USER_ID_KEY, user.id.toString());
  return user;
};

export const signupAPI = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<User> => {
  const users = getMockUsers();

  if (users.some((u) => u.username === username))
    throw new Error("User already exists");

  const newUser: User = {
    id: Date.now(),
    username,
    password,
  };

  users.push(newUser);
  saveMockUsers(users);
  localStorage.setItem(USER_ID_KEY, newUser.id.toString());

  return newUser;
};

export const getCurrentUser = (): User | null => {
  const idStr = localStorage.getItem(USER_ID_KEY);
  if (!idStr) return null;
  const users = getMockUsers();
  return users.find((u) => u.id === parseInt(idStr)) || null;
};

export const logoutAPI = () => {
  localStorage.removeItem(USER_ID_KEY);
};
