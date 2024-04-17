import { User } from "../mongoose/schemas/user.mjs";
import { mockUsers } from "./constants.mjs";

// export const resolveIndexByUserId = (request, response, next) => {
//     const {
//       body,
//       params: { id },
//     } = request;
//     const parseId = parseInt(id);
//     if (isNaN(parseId)) return response.sendStatus(400);
  
//     const findUserIndex = mockUsers.findIndex((user) => user.id === parseId);
//     if (findUserIndex === -1) return response.sendStatus(404);
//     request.findUserIndex = findUserIndex;
//     next();
//   };

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
