import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import { HydratedDocument } from "mongoose";

@Schema()
export class ReportEntity{
    @Prop({type: String})
    make: string;

    @Prop({type: String})
    model: string;

    @Prop({type: String})
    year: string;

    @Prop({type: String})
    mileage: string;

    @Prop({type: String})
    latitude: string;

    @Prop({type: String})
    longitude: string;

    @Prop({type: String})
    price?: string;

    @Prop({type: Boolean})
    approved: boolean;
}

export type ReportDcoument = HydratedDocument<ReportEntity>;

export const ReportSchema = SchemaFactory.createForClass(ReportEntity);