interface User {
  id: string;
  email: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
}

export type { User, LoginPayload, RegisterPayload };
