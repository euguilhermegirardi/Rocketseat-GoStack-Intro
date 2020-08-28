import { Request, Response } from "express";

import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: "gira@icloud.com",
    password: "123123",
    techs: ["ReactJS", "TypeScript", { title: "JavaScript", experience: 100 }],
  });

  return response.json({ message: "Hello TypeScript!" });
}
