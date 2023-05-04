import User from '../models/User.js';

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id, '-password');
        if (!user) return res.status(404);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate('friends');
        const formattedFriends = user.friends.map(
            ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            }) => ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            })
        );

        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserSearch = async (req, res) => {
    try {
        const search = req.params.searchValue;
        const searchString = new RegExp(search, 'ig');

        const users = await User.aggregate()
            .project({
                fullName: { $concat: ['$firstName', ' ', '$lastName'] },
                reversedName: { $concat: ['$lastName', ' ', '$firstName'] },
                lastName: 1,
                firstName: 1,
                email: 1,
                picturePath: 1,
                occupation: 1,
            })
            .match({
                $or: [
                    { fullName: searchString },
                    { reversedName: searchString },
                    { email: searchString },
                ],
            })
            .exec();
        res.json(users);
    } catch (error) {
        res.status(404).json({ msg: error });
    }
};

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter(
                (id) => id.toString() !== friendId
            );
            friend.friends = friend.friends.filter(
                (friendId) => id !== friendId
            );
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            }) => ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            })
        );
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
