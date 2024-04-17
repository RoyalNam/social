import { User } from '../mongoose/schemas/user.mjs';

export const resolveIndexByUserId = async (request, response, next) => {
    const {
        params: { id },
    } = request;
    try {
        const findUser = await User.findById(id);
        if (!findUser) return response.sendStatus(404);
        request.findUserIndex = findUser;
        next();
    } catch (err) {
        console.log(err);
        return response.sendStatus(500);
    }
};
