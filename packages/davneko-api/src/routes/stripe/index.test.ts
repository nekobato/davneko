import app from ".";

describe("/stripe", () => {
  it("/get secret token", async () => {
    const response = await app.request("/create-setup-intent", {
      method: "POST"
    });

    console.log(await response.json());

    expect(response.status).toBe(200);
  });
});
