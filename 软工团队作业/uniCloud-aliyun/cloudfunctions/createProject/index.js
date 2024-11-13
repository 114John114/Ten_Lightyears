const cloud = require('crypto');


const db = uniCloud.database();

exports.main = async (event, context) => {
  // 解构参数
  const { name, description, category, scale, state,que,username,lianxi } = event;

  // 检查必填参数是否存在
  if (!name || !description || !category || !scale|| !state||!que||!username||!lianxi) {
    return {
      success: false,
      error: '缺少必要的参数'
    };
  }

  try {
    // 写入数据到数据库
    await db.collection('projects').add({
      data: {
        name,
        description,
        category,
        scale,
		state,
		que,
		username,
		lianxi,
        createdAt: new Date()
      }
    });
    
    return {
	  
      success: true
    };
  } catch (error) {
    console.error('Error adding project:', error);
    return {
      success: false,
      error: error.message || '数据库写入失败'
    };
  }
};
