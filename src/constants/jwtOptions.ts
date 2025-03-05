export const JWT = {
  //   secret: 'SECRET ',
  secret: process.env.JWT_SECRET,
  expire: process.env.JWT_EXPIRE,
};
