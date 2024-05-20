interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IAuthenticatedUser {
  name: string;
  email: string;
}

export interface IColor {
  name: string;
  id: string;
  code: string;
}

export interface IIcon {
  name: string;
  id: string;
  symbol: string;
}

export interface ICategory {
  _id: string;
  name: string;
  user: IUser | string;
  isEditable: boolean;
  color: IColor;
  icon: IIcon;
}

interface ICategoryRequest {
  name: string;
  color: IColor;
  icon: IIcon;
}

interface ITask {
  _id: string;
  name: string;
  isCompleted: boolean;
  categoryId: string;
  createdAt: string;
  date: string;
}

interface ITaskRequest {
  name: string;
  isCompleted: boolean;
  categoryId: string;
  date: string;
}
