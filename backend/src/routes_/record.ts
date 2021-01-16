import express from "express";
import * as api from "../api";
import * as images from "../utils/storage";
const router = express.Router();

router.get("/get_draft_route_id", async (req, res) => {
  const location = await api.route.getDraft("test001");
  res.json({
    status: "OK",
    results: location,
  });
});

router.get("/get_route", async (req, res) => {
  const { route_id } = req.query;
  const results = await api.route.getMyRoute(String(route_id));
  res.json({
    status: "OK",
    results: results,
  });
});

router.get("/get_route_locations", async (req, res) => {
  const { route_id } = req.query;
  api.route
    .getRouteLocations(String(route_id))
    .then((results: any) => {
      res.json({
        status: "OK",
        results,
      });
    })
    .catch((error: any) => {
      res.json({
        status: "NG",
        error,
      });
    });
});

router.post("/finish", async (req, res) => {
  const { route_id } = req.body;
  api.route
    .setRouteStatus(String(route_id), "published")
    .then((results: any) => {
      res.json({
        status: "OK",
        results: {
          route_id,
          ...results,
        },
      });
    })
    .catch((error: any) => {
      res.json({
        status: "NG",
        error,
      });
    });
});

router.post(
  "/create_photo",
  (_, res, next) => {
    res.locals.contentType = "photo";
    next();
  },
  images.multer.single("photo"),
  images.sendUploadToGCS,
  (req, res) => {
    const { location_id } = req.body;
    api.location
      .updateLocation({
        id: String(location_id),
        photo_url: (req.file as any).cloudStoragePublicUrl as string,
      })
      .then((results: any) => {
        res.json({
          status: "OK",
          results: {
            url: (req.file as any).cloudStoragePublicUrl,
          },
        });
      })
      .catch((error: any) => {
        res.json({
          status: "NG",
          error,
        });
      });
  }
);

export default router;
