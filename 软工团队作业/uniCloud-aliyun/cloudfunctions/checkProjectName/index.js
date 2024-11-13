// 云函数：checkProjectName
exports.main = async (event) => {
  const { name } = event; // 从请求中获取项目名称
  const db = uniCloud.database();
  
  // 查询数据库，检查名称是否存在
  const result = await db.collection('projects').where({
    'data.name': name
  }).get();

  return result.data.length > 0; // 如果找到项目，返回 true
};
