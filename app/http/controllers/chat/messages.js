import { Message } from "../../..";

const messages = {
    async index(req, res, next) {
        try {
            const data = await Message.find({
                conversationId: req.params.id
            });
            res.status(200).json({ status: true, message: "fetch successfully", data });
        } catch (error) {
            return next(error);
        }
    },
    async messages(req, res, next) {
        const { conversationId, senderId, message } = req.body;
        console.log(req.body);
        try {
            const data = await Message.create({
                conversationId,
                senderId,
                message
            });
            console.log(data);
            res.status(200).json({ status: true, message: "fetch successfully", data });
        } catch (error) {
            return next(error)
        }
    }
}

export default messages;