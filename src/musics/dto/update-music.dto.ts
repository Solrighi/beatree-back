import { CreateMusicSchema } from './create-music.dto'
import { z } from 'zod'

export const UpdateMusicSchema = CreateMusicSchema.partial()

export type UpdateMusicDto = z.infer<typeof UpdateMusicSchema>
