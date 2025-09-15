const { advertiseRequestsCollection, advertiseClicksCollection, ObjectId } = require('../mongodb/mongodb');

// Record a click on an advertisement
exports.recordClick = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!id || !userId) {
            return res.status(400).json({ message: 'Advertisement ID and User ID are required' });
        }

        // Find the advertisement
        const advertisement = await advertiseRequestsCollection.findOne({ _id: new ObjectId(id) });
        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        // Check if the advertisement is active
        if (advertisement.status !== 'approved' && advertisement.status !== 'active') {
            return res.status(400).json({ message: 'Advertisement is not active' });
        }

        // Create a new click record
        await advertiseClicksCollection.insertOne({
            advertiseId: new ObjectId(id),
            userId,
            timestamp: new Date()
        });

        // Increment the clicks count on the advertisement
        await advertiseRequestsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { clicks: 1 } }
        );

        return res.status(200).json({ message: 'Click recorded successfully' });
    } catch (error) {
        console.error('Error recording click:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get click statistics for an advertisement
exports.getClickStats = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Advertisement ID is required' });
        }

        // Find the advertisement
        const advertisement = await advertiseRequestsCollection.findOne({ _id: new ObjectId(id) });
        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        // Get click count
        const clickCount = await advertiseClicksCollection.countDocuments({ advertiseId: new ObjectId(id) });

        // Get unique user count
        const uniqueUsers = await advertiseClicksCollection.distinct('userId', { advertiseId: new ObjectId(id) });
        const uniqueUserCount = uniqueUsers.length;

        // Get clicks by date (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const clicksByDate = await advertiseClicksCollection.aggregate([
            {
                $match: {
                    advertiseId: new ObjectId(id),
                    timestamp: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]).toArray();

        return res.status(200).json({
            totalClicks: clickCount,
            uniqueUsers: uniqueUserCount,
            clicksByDate
        });
    } catch (error) {
        console.error('Error getting click stats:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};