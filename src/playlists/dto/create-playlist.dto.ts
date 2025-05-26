import { z } from 'zod'

export const CreatePlaylistSchema = z.object({
  name: z.string(),
  createdBy: z.string(),
  isPublic: z.boolean()
})

export type CreatePlaylistDto = z.infer<typeof CreatePlaylistSchema>
