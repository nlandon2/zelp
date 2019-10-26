module.exports = (knex, User) => {
  return async () => {
    const users = await knex("users").select();
    const serializedUsers = [];

    for (const user in users) {
      const newUser = new User(users[user]);
      serializedUsers.push(newUser);
    }
    return serializedUsers; // fix me!
  };
};
