const { getTopUsersByPostCount } = require('../services/dataService');

exports.getTopUsers = async (req, res) => {
  try {
    const users = await getTopUsersByPostCount();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top users' });
  }
};
