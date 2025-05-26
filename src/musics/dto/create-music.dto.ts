import { z } from 'zod'

export const CreateMusicSchema = z.object({
  name: z.string(),
  artist: z.string(),
  album: z.string().optional(),
  year: z.number().optional()
})

export type CreateMusicDto = z.infer<typeof CreateMusicSchema>
