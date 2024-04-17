import { Router } from "express";
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";
const router = Router();

router.get("/api/users", async (request, response) => {
  const { filter, value } = request.query;
  try {
    let users;
    if (filter && value) {
      // If filter and value are provided in the query, filter users based on the criteria
      const filterQuery = {};
      filterQuery[filter] = { $regex: new RegExp(value, "i") }; // Case-insensitive search
      users = await User.find(filterQuery);

    } else {
      // If no filter is provided, retrieve all users
      users = await User.find();
    }
    return response.status(200).send(users);
  } catch (err) {
    console.log(err);
    return response.sendStatus(500);
  }
});


router.get("/api/users/:id", async (request, response) => {

  const { findUserIndex } = request;
  try {
    const findUser = await User.findById(findUserIndex)
    return response.status(201).send(findUser);
  } catch (err) {
    console.log(err);
    return response.sendStatus(404);
  }
});



router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send(result.array());

    const data = matchedData(request);
    console.log(data);
    data.password = hashPassword(data.password)
    console.log(data);

    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return response.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return response.sendStatus(400);
    }
  }
);


router.put("/api/users/:id", async (request, response) => {
  const { body, params:{id}  } = request;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    return response.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
    return response.sendStatus(500);
  }
});


router.delete("/api/users/:id", async (request, response) => {
  const { params:{id} } = request;
  try {
    await User.findByIdAndDelete(id);
    return response.sendStatus(200);
  } catch (err) {
    console.log(err);
    return response.sendStatus(500);
  }
});

export default router;
