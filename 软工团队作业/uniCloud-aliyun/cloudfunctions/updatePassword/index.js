const db = uniCloud.database();
const crypto = require('crypto');

exports.main = async (event, context) => {
	const { username, newPassword } = event;

	try {
		// 对输入的新密码进行 SHA-256 加密
		const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');

		// 更新密码
		const res = await db.collection('users').where({
			username: username
		}).update({
			password: hashedPassword // 使用加密后的密码进行更新
		});

		if (res.updated === 0) {
			return {
				code: 404,
				message: '用户未找到'
			};
		}

		return {
			code: 200,
			message: '密码修改成功'
		};
	} catch (error) {
		console.error('Error updating password:', error);
		return {
			code: 500,
			message: '服务器错误，请重试'
		};
	}
};
