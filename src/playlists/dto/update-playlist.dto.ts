import { z } from 'zod'
import { CreatePlaylistSchema } from './create-playlist.dto'

export const UpdatePlaylistSchema = CreatePlaylistSchema.partial()

export type UpdatePlaylistDto = z.infer<typeof UpdatePlaylistSchema>
