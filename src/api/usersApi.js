const users = [
  { id: 1, name: "Bravo", email: "abravo@mail.com" },
  { id: 2, name: "Alan", email: "balan@mail.com" },
  { id: 3, name: "Cicilia", email: "cicilia@mail.com" },
];

export const getUsers = new Promise((resolve, reject) => {
  new setTimeout(resolve(users), 0);
});
