import { Test, TestingModule } from '@nestjs/testing'
import { MusicsController } from './musics.controller'
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

describe('MusicsController', () => {
  let controller: MusicsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicsController],
      providers: [
        MusicsService,
        {
          provide: getModelToken('Music'),
          useValue: mockMusicModel
        }
      ]
    }).compile()

    controller = module.get<MusicsController>(MusicsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a music', async () => {
    const dto: CreateMusicDto = { name: 'My Song', artist: 'Author' }
    const music = await controller.create(dto)

    expect(music).toHaveProperty('_id')
    expect(music.name).toBe(dto.name)
    expect(music.artist).toBe(dto.artist)
  })

  it('should return all musics', async () => {
    const allMusics = await controller.findAll()
    expect(Array.isArray(allMusics)).toBe(true)
    expect(allMusics[0]).toHaveProperty('name', 'My Song')
  })

  it('should return a music by id', async () => {
    const found = await controller.findOne('123')
    expect(found).toEqual({ _id: '123', name: 'My Song', artist: 'Author' })
  })

  it('should update a music', async () => {
    const updateDto: UpdateMusicDto = { name: 'Atualizada' }
    const updated = await controller.update('123', updateDto)
    expect(updated?.name).toBe('Atualizada')
  })

  it('should remove a music', async () => {
    const removed = await controller.remove({ ids: ['123', '456'] })
    expect(removed.deletedCount).toBe(1)
  })
})
