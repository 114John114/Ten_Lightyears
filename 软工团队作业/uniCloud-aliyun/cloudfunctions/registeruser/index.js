const db = uniCloud.database();
const crypto = require('crypto'); // 使用内置的 crypto 模块

// 用户注册
exports.main = async (event, context) => {
	const { username, password } = event;

	try {
		// 检查用户名是否已存在
		const userCheck = await db.collection('users').where({ username }).get();
		if (userCheck.data.length > 0) {
			return { code: 400, message: '用户名已存在，请使用其他用户名' };
		}

		// 密码加密
		const hashedPassword = crypto.createHash('sha256').update(password).digest('hex'); // SHA-256 加密

		// 插入新用户数据
		const result = await db.collection('users').add({
			username,
			password: hashedPassword,
			realname: '',    // 默认值
			academy: '',     // 默认值
			identity: '',    // 默认值
			created_at: new Date()
		});

		return result.id ? { code: 200, message: '注册成功' } : { code: 500, message: '注册失败，请重试' };
	} 
	catch (error) {
		console.error('Error during registration:', error);
		return { code: 500, message: '服务器错误，请重试' };
	}
};
