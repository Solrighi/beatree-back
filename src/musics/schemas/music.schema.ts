import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type MusicDocument = HydratedDocument<Music>

@Schema()
export class Music {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  artist: string

  @Prop()
  album: string

  @Prop()
  year: number
}

export const MusicSchema = SchemaFactory.createForClass(Music)
