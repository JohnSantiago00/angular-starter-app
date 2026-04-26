import { InferSchemaType, Schema, model } from 'mongoose';

const housingLocationSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
      trim: true,
    },
    availableUnits: {
      type: Number,
      required: true,
      min: 0,
    },
    wifi: {
      type: Boolean,
      required: true,
    },
    laundry: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret._id;
        return ret;
      },
    },
  },
);

type HousingLocationDocument = InferSchemaType<typeof housingLocationSchema>;

const HousingLocationModel = model<HousingLocationDocument>(
  'HousingLocation',
  housingLocationSchema,
);

export { HousingLocationModel };
