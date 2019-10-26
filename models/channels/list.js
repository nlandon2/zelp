module.exports = (knex, Channel) => {
  return async () => {
    const channels = await knex("channels").select();
    const serializedChannels = [];

    for (const channel in channels) {
      const newChannel = new Channel(channels[channel]);
      serializedChannels.push(newChannel);
    }
    return serializedChannels;
  };
};
