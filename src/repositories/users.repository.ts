import UserModel from "../models/users.model";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
}

export const store = async (userData: UserData) => {
  const userExists = await UserModel.exists({ email: userData.email });

  if(userExists) {
    throw new Error("User already exists");
  }

  const userModel = new UserModel(userData);

  return userModel.save();
};

export const findByEmail = (email: string) => UserModel.findOne({ email }) as any;

export const findById = (_id: string) => UserModel.findOne({ _id });