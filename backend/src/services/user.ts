import User from "../models/User.js";

export const findOrCreate = async (
  email: string,
  emailVerified: boolean,
  familyName: string,
  givenName: string,
  oAuthProvider: string,
  oAuthId: string
): Promise<[User, boolean]> => {
  const user: [User, boolean] = await User.findOrCreate({
    where: {
      email: email,
      emailVerified: emailVerified,
      familyName: familyName,
      givenName: givenName,
      oAuthProvider: oAuthProvider,
      oAuthId: oAuthId,
    },
  });
  return user;
};

export const findUserByOAuthId = async (
  oAuthId: string
): Promise<User | null> => {
  const user = await User.findOne({
    where: {
      oAuthId: oAuthId,
    },
  });
  return user;
};

export const updateUser = async (
  email: string,
  emailVerified: boolean,
  familyName: string,
  givenName: string,
  oAuthProvider: string,
  oAuthId: string
): Promise<User | null> => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    user.emailVerified = emailVerified;
    user.familyName = familyName;
    user.givenName = givenName;
    user.oAuthProvider = oAuthProvider;
    user.oAuthId = oAuthId;
    await user.save();
    return user;
  } else {
    return null;
  }
};

export const create = async (email: string) => {
  const user = await User.create({
    email: email,
  });
  return user;
};
