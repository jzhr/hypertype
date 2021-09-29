import express from "express";
import Score from "../models/score";
const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.send("Hypertype API");
});

router.get("/scores", (req: any, res: any, next: any) => {
  Score.find({}, "score")
    .then((data: any) => res.json(data))
    .catch(next);
});

router.get("/scores/leaderboard", (req: any, res: any, next: any) => {
  console.log("Getting leaderboard scores.");
  Score.find({ score: { $exists: true } })
    .sort({ score: -1 })
    .limit(5)
    .then((data: any) => res.json(data))
    .catch(next);
});

router.post("/scores", (req: any, res: any, next: any) => {
  if (req.body.score) {
    Score.create(req.body)
      .then((data: any) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.delete("/scores/:id", (req: any, res: any, next: any) => {
  Score.findOneAndDelete({ _id: req.params.id })
    .then((data: any) => res.json(data))
    .catch(next);
});

export default router;
