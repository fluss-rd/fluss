export type Credentials = {
  email: string;
  password: string;
};

export type LogInData = {
  token: string;
  userId: string;
};

export type UserData = {
  userId: string;
  name: string;
  phoneNumber: string;
  roleName: string;
  email: string;
  creationDate: string;
  updateDate: string;
};

export type UserInfo = {
  name: string;
  phoneNumber: string;
  email: string;
};
