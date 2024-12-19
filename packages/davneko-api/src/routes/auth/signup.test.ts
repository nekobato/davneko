import app from "./signup";

describe("/auth/signup", () => {
  it("/signup: 200", async () => {
    const response = await app.request("/signup", {
      method: "POST",
      body: JSON.stringify({
        username: "nekobato",
        email: "nekobato@gmail.com",
        password: "nnn"
      })
    });

    expect(response.status).toBe(200);
    console.log(await response.json());
  });
});
