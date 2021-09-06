import { Schema, model } from "mongoose";

interface Score {
  score: string;
}

const ScoreSchema = new Schema<Score>({
  score: {
    type: String,
    required: [true, "The score text field is required"],
  },
});

const Score = model<Score>("score", ScoreSchema);

export default Score;
