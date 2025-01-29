import app from ".";

describe("/auth", () => {
  it("/check: 401", async () => {
    const response = await app.request("/check", {
      method: "GET"
    });

    expect(response.status).toBe(401);
  });

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

  it("/signin: 401", async () => {
    const response = await app.request("/signin", {
      method: "POST",
      body: JSON.stringify({
        email: "nekobato@gmail.com",
        password: "bad_password"
      })
    });

    expect(response.status).toBe(401);
  });

  it("/signin: 200", async () => {
    const response = await app.request("/signin", {
      method: "POST",
      body: JSON.stringify({
        email: "nekobato@gmail.com",
        password: "nnn"
      })
    });

    expect(response.status).toBe(200);
  });
});
