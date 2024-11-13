// getProjectDetails.js
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { id } = event;

  try {
    const res = await db.collection('projects').doc(id).get();
    if (res.data.length > 0) {
      return res.data[0]; // 返回项目详细信息
    } else {
      return { error: '未找到该项目' };
    }
  } catch (error) {
    return { error: error.message };
  }
};
