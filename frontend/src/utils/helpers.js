export const userStatus = (user) => {
  console.log(user);
  return user.status === "online" ? "online" : "offline";
};
