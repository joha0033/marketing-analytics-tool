import { Document, Schema, Model, model } from "mongoose";

export interface IClickData {
  product: string;
  productName: string;
  createdAt: Date;
  source: string;
  clicks: number;
}

export interface IClickDataModel extends IClickData, Document {
  getName(): string;
}

export var ClickDataSchema: Schema = new Schema({
  createdAt: { type: Date, index: true },
  product: { type: String, index: true },
  productName: { type: String, index: true },
  source: String,
  clicks: Number
});

ClickDataSchema.pre<IClickDataModel>("save", function(next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const ClickData: Model<IClickDataModel> = model<IClickDataModel>(
  "ClickData",
  ClickDataSchema
);
