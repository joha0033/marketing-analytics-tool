import {Document, Schema, Model, model} from 'mongoose';

export interface ISource {
  name: string;
  createdAt: Date;
}

export interface ISourceModel extends ISource, Document {
  getName(): string;
}

export var SourceSchema: Schema = new Schema({
  createdAt: Date,
  name: String
});

SourceSchema.pre<ISourceModel>('save', function(next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const Source: Model<ISourceModel> = model<ISourceModel>('Source', SourceSchema);
