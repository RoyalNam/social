import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.headers.cookie);
  console.log(request.cookies);
  console.log(request.signedCookies.hello);

  if (request.signedCookies.hello && request.signedCookies.hello === "world")
    return response.send([
      { id: 1, name: "pizza", price: 12.22 },
      { id: 2, name: "chicken", price: 12.22 },
      { id: 3, name: "rice", price: 12.22 },
      { id: 4, name: "pho", price: 12.22 },
    ]);
  return response
    .status(403)
    .send({ msg: "Sorry. You need the correct cookie" });
});

export default router;
