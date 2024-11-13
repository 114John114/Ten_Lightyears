const db = uniCloud.database();
const crypto = require('crypto'); // 使用内置的 crypto 模块

// 用户登录
exports.main = async (event, context) => {
	const { username, password } = event;

	try {
		// 对输入的密码进行 SHA-256 加密
		const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

		// 查询用户
		const user = await db.collection('users').where({
			username: username,
			password: hashedPassword // 使用加密后的密码进行比较
		}).get();

		if (user.data.length > 0) {
			return {
				code: 200,
				message: '登录成功',
				userInfo: user.data[0] // 返回用户信息
			};
		} else {
			return {
				code: 401,
				message: '用户名或密码错误'
			};
		}
	} catch (error) {
		console.error('Error during login:', error);
		return { code: 500, message: '服务器错误，请重试' };
	}
};
