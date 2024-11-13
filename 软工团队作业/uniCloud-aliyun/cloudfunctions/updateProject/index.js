// updateProject.js
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { id, name, description, category, scale, state, que, lianxi } = event;

  // 准备要更新的数据
  const updateData = {};
  
  // 将字段放入 data 对象中
  updateData.data = {};
  
  if (name) updateData.data.name = name;
  if (description) updateData.data.description = description;
  if (category) updateData.data.category = category;
  if (scale) updateData.data.scale = scale;
  if (state) updateData.data.state = state;
  if (que) updateData.data.que = que;
  if (lianxi) updateData.data.lianxi = lianxi;
  try {
    const res = await db.collection('projects').doc(id).update(updateData);

    if (res.updated === 1) {
      return { success: true };
    } else {
      return { error: '未更新任何项目或未找到项目' };
    }
  } catch (error) {
    return { error: error.message };
  }
};
