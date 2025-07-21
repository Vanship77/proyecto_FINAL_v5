export interface User {
  _id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  photoUrl?: string;
  role: 'admin' | 'user';
  provider: 'local' | 'google' | 'github';
  isActive?: boolean;
  lastLogin?: Date;
  events?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserForm {
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  isActive: boolean;
}