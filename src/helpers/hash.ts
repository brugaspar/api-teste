import bcrypt from "bcryptjs";

export const make = (value: any) => bcrypt.hash(value, 10);

export const compare = (value: any, hashedValue: any) => bcrypt.compare(value, hashedValue);