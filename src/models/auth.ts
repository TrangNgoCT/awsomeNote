interface User {
  id: string;
  username: string;
  email: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}

export type { User, LoginPayload, RegisterPayload };
