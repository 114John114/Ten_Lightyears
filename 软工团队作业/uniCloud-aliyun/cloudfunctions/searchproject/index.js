const db = uniCloud.database();

exports.main = async (event) => {
    const { keyword } = event;

    if (!keyword) {
        return {
            code: 400,
            message: 'Keyword is required.',
        };
    }

    try {
      
		const dbCmd = db.command;
		const result = await db.collection('projects')
			.where(
				dbCmd.or([
					{ 'data.name': new RegExp(keyword.trim(), 'i') },
					{ 'data.description': new RegExp(keyword.trim(), 'i') },
					{ 'data.category': new RegExp(keyword.trim(), 'i') },
					{ 'data.username': new RegExp(keyword.trim(), 'i') },
				])
			)
			.get();


       
        const formattedResults = result.data.map(item => ({
            data: item.data 
        }));

        return {
            code: 200,
            data: formattedResults,
        };
    } catch (error) {
        return {
            code: 500,
            message: error.message,
        };
    }
};
