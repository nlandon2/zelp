module.exports = (knex, ChannelMessage) => async params => {
  const channelId = params.channelId;
  const serializedMessages = [];

  const channelInfo = await knex("channel_messages")
    .join("channels", "channel_messages.channel_id", "=", "channels.id")
    .join("users", "channel_messages.from_id", "=", "users.id")
    .where({ channel_id: channelId })
    .select();
  for (const message in channelInfo) {
    const newChannelMessage = new ChannelMessage(channelInfo[message]);
    serializedMessages.push(newChannelMessage);
  }
  return serializedMessages;

  //returning an array of messages
};
