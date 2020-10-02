import express from "express";
import * as api from "../api";
import passport from "../api/auth/passsport";
import * as auth from "./auth";
import { isAuthenticated } from "../utils/auth";
const router = express.Router();

router.get("/user/:userId/profile", async (req, res) => {
  try {
    const user = await api.user.getUserById(req.params.userId);
    res.json(user);
  } catch (error) {
    throw error;
  }
});

router.post("/user/create", async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
    };
    await api.user.createUser(user);
    res.status(200).end();
  } catch (error) {
    throw error;
  }
});

router.get("/user/:user_id/stories", () => {});

router.get("/routes/latest", (_, res) => {
  api.route
    .getLatest()
    .then((results: any) => {
      res.status(200).json({
        status: "OK",
        results: {
          routes: results,
        },
      });
    })
    .catch((error: Error) => {
      res.status(500).json({
        status: "NG",
        error,
      });
    });
});

router.post("/route/create", isAuthenticated, async (req, res) => {
  const results = await api.route.create({
    authorId: (req.user as any).id,
  });
  res.status(200).json({
    status: "OK",
    results,
  });
});

router.post("/route/update", async (req, res) => {
  const { id, title, description } = req.body;
  const results = await api.route.updateRoute({
    id,
    title,
    description,
  }).then;
  res.status(200).json({
    status: "OK",
    results,
  });
});

router.get("/route/:id", async (req, res) => {
  const { id } = req.params;
  const route = await api.route.getRoute(id);
  const author = await api.user.getUserById(route.author_id);
  const locations = await api.route.getRouteLocations(id);
  res.json({ status: "OK", results: { route, author, locations } });
});

router.get("/location/:id", async (req, res) => {
  const location = await api.location.getLocation(Number(req.params["id"]));
  res.json(location);
});

router.post("/location/create", async (req, res) => {
  const { route_id, point } = req.body;
  try {
    const results = await api.location.createLocation({
      route_id,
      point,
    });
    res.status(200).json({
      status: "OK",
      results,
    });
  } catch (error) {
    res.status(500).json({
      status: "NG",
      error,
    });
  }
});

router.post("/location/update", async (req, res) => {
  const { id, latitude, longitude, photo_url, audio_url, comment } = req.body;
  try {
    const results = await api.location.updateLocation({
      id,
      latitude,
      longitude,
      photo_url,
      audio_url,
      comment,
    });
    res.status(200).json({
      status: "OK",
      results,
    });
  } catch (error) {
    res.status(500).json({
      status: "NG",
      error,
    });
  }
});

router.get("/my/info", isAuthenticated, (req, res) => {
  api.route
    .getMyInfo((req.user as any).id)
    .then((results: any[]) => {
      res.status(200).json({
        status: "OK",
        results: {
          info: results,
        },
        user: req.user,
      });
    })
    .catch((error: Error) => {
      res.status(500).json({
        status: "NG",
        error,
      });
    });
});

router.get("/my/routes", isAuthenticated, (req, res) => {
  api.route
    .getMyRoutes((req.user as any).id)
    .then((results: any[]) => {
      res.status(200).json({
        status: "OK",
        results,
        user: req.user,
      });
    })
    .catch((error: Error) => {
      res.status(500).json({
        status: "NG",
        error,
      });
    });
});

router.get("/login", passport.authenticate("bearer"), auth.local.login);

router.get("/auth/twitter", passport.authenticate("twitter"));
router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/",
    successRedirect: "/",
  }),
  auth.twitter.callback
);

router.get("/auth/status", auth.status);
router.get("/auth/logout", auth.logout);

export default router;
