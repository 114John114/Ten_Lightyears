const db = uniCloud.database();

// 用户信息更新
exports.main = async (event, context) => {
	const { username, realname, academy, identity } = event;

	try {
		// 检查必填参数是否存在
		if (!username || !realname || !academy || !identity) {
			return {
				code: 400,
				message: '缺少必要的参数'
			};
		}

		// 更新用户信息
		const result = await db.collection('users').where({ username }).update({
			realname,
			academy,
			identity,
			updated_at: new Date() // 添加更新时间戳
		});

		// 检查更新结果
		if (result.updated === 0) {
			return {
				code: 404,
				message: '没有找到匹配的用户'
			};
		}

		return {
			code: 200,
			message: '更新成功'
		};
	} 
	catch (error) {
		console.error('Error during update:', error);
		return {
			code: 500,
			message: '服务器错误，请重试'
		};
	}
};
