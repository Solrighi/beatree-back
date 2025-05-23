import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type PlaylistDocument = HydratedDocument<Playlist>

@Schema()
export class Playlist {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  createdBy: string

  @Prop({ required: true })
  isPublic: boolean

  @Prop({ type: [Types.ObjectId], ref: 'Music' })
  musics: Types.ObjectId[]
}

export const PlaylistsSchema = SchemaFactory.createForClass(Playlist)
