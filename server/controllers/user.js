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
        const user = await User.findById(id);
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

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        console.log(id, friendId);
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
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
