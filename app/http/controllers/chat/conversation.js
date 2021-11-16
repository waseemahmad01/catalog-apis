import { User, CustomErrorHandler, Conversation } from "../../..";

const conversation = {
    async index(req, res, next) {
        try {

            console.log(req.params.receiverId);
            let users = await Conversation.findOne({
                members: {
                    $all: [
                        req.params.senderId,
                        req.params.receiverId
                    ]
                },
            });
            const data = users ? users : {
                "members": [
                    "60d70c260b6c84340c56dfe3",
                    "60c352d3d95107146c80a487"
                ],
                "_id": "60e979a5e879f91a54deaa16",
                "from": "undefined undefined",
                "to": "Muhammad Hassaan",
                "from_profile": "",
                "to_profile": "",
                "createdAt": "2021-07-10T10:42:45.238Z",
                "updatedAt": "2021-07-10T10:42:45.238Z",
                "__v": 0
            }
            res.status(200).json({ status: users ? true : false, message: 'fetch successfully', data });
        } catch (error) {
            return next(error)
        }
    },
    async userId(req, res, next) {
        try {
            const data = await Conversation.find({
                members: { $in: [req.params.id] },
            });
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },
    async conversation(req, res, next) {
        // console.log('helo');
        const { receiverId } = req.body;
        const { _id } = req.user;
        try {
            const user = await User.findOne({ _id });
            // console.log(user);
            const receiverUser = await User.findOne({ _id: receiverId });
            // console.log(receiverUser);
            const data = await Conversation.create({
                members: [req.user._id, receiverUser._id.toString()],
                from: user.username,
                // from: `${user.firstname} ${user.lastname}`,
                to: receiverUser.username,
                // to: `${receiverUser.firstname} ${receiverUser.lastname}`,
                from_profile: user.profile_img ? user.profile_img : '',
                to_profile: receiverUser.profile_img ? receiverUser.profile_img : '',
            });
            // console.log(data);
            res.status(201).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error)
        }
    }
}

export default conversation;