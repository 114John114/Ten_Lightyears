exports.main = async (event, context) => {
  const db = uniCloud.database();
  const { username } = event; // 获取传入的用户名

  try {
    // 查询数据库，假设用户集合名为 'users'
    const userRecord = await db.collection('users').where({ username }).get();

    if (userRecord.data.length > 0) {
      const user = userRecord.data[0];
      return {
        code: 200,
        data: {
          username: user.username,
          realname: user.realname,
          academy: user.academy,
          identity: user.identity
        }
      };
    } else {
      return {
        code: 404,
        message: '用户未找到'
      };
    }
  } catch (error) {
    return {
      code: 500,
      message: '查询失败',
      error
    };
  }
};
