import { Test, TestingModule } from '@nestjs/testing'
import { MusicsService } from './musics.service'
import { getModelToken } from '@nestjs/mongoose'
import { CreateMusicDto } from './dto/create-music.dto'
import { UpdateMusicDto } from './dto/update-music.dto'

const mockMusicModel = {
  create: jest
    .fn()
    .mockImplementation((dto) => Promise.resolve({ _id: '123', ...dto })),
  find: jest.fn().mockReturnValue({
    exec: jest
      .fn()
      .mockResolvedValue([{ _id: '123', name: 'My Song', artist: 'Author' }])
  }),
  findOne: jest.fn().mockReturnValue({
    exec: jest
      .fn()
      .mockResolvedValue({ _id: '123', name: 'My Song', artist: 'Author' })
  }),
  findOneAndUpdate: jest.fn().mockReturnValue({
    exec: jest
      .fn()
      .mockResolvedValue({ _id: '123', name: 'Atualizada', artist: 'Autor' })
  }),
  deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 })
}

describe('MusicsService', () => {
  let service: MusicsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicsService,
        {
          provide: getModelToken('Music'),
          useValue: mockMusicModel
        }
      ]
    }).compile()

    service = module.get<MusicsService>(MusicsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a music', async () => {
    const dto: CreateMusicDto = { name: 'My Song', artist: 'Author' }
    const music = await service.create(dto)

    expect(music).toHaveProperty('_id')
    expect(music.name).toBe(dto.name)
    expect(music.artist).toBe(dto.artist)
  })

  it('should return all musics', async () => {
    const allMusics = await service.findAll()
    expect(Array.isArray(allMusics)).toBe(true)
    expect(allMusics[0]).toHaveProperty('name', 'My Song')
  })

  it('should find a music by id', async () => {
    const found = await service.findOne('123')
    expect(found).toEqual({ _id: '123', name: 'My Song', artist: 'Author' })
  })

  it('should update a music', async () => {
    const updateDto: UpdateMusicDto = { name: 'Atualizada' }
    const updated = await service.update('123', updateDto)
    expect(updated?.name).toBe('Atualizada')
  })

  it('should remove a music', async () => {
    const removed = await service.remove(['123'])
    expect(removed.deletedCount).toBe(1)
  })
})
