import { Request, Response } from "express";
import { CRUDController } from "../CRUDController";

import { ClickData } from "../../models/ClickData";

export class ClickDataController extends CRUDController {
  public async create(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const newData = new ClickData({
      productName: req.body.productName,
      product: req.body.product,
      createdAt: req.body.createdAt,
      source: req.body.source,
      clicks: req.body.clicks
    });

    await newData.save();
    res.json(newData);
  }

  public read(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    const id = req.query.id;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    ClickData.aggregate(
      [
        {
          $match: {
            $and: [
              { product: id },
              { createdAt: { $gte: startDate, $lte: endDate } }
            ]
          }
        },
        {
          $group: {
            _id: {
              createdAt: "$createdAt",
              productName: "$productName"
            },
            result: {
              $push: {
                source: "$source",
                clicks: "$clicks"
              }
            }
          }
        },
        {
          $project: {
            result: 1
          }
        }
      ],
      (err, stats) => {
        res.json({
          clicks: Object.keys(stats).length > 0 ? stats : {}
        });
      }
    );
  }

  public update(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }

  public delete(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }
}
