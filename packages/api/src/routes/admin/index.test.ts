import app from ".";

describe("/admin", () => {
  it("/scan: 200", async () => {
    const response = await app.request("/scan", {
      method: "GET"
    });

    expect(response.status).toBe(401);
  });
});
