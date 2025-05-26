import { Test, TestingModule } from '@nestjs/testing'
import { PlaylistsController } from './playlists.controller'
import { PlaylistsService } from './playlists.service'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { UpdatePlaylistDto } from './dto/update-playlist.dto'
import { Playlist } from './schemas/playlist.schema'
import { Types } from 'mongoose'

describe('PlaylistsController', () => {
  let controller: PlaylistsController
  let service: PlaylistsService

  const validPlaylistId = '507f191e810c19729de860ea'
  const validMusicId = '507f191e810c19729de860eb'

  const mockPlaylistsService = {
    create: jest.fn(
      (dto: CreatePlaylistDto): Promise<Playlist> =>
        Promise.resolve({
          _id: new Types.ObjectId(),
          ...dto,
          musics: [],
          createdBy: dto.createdBy,
          isPublic: dto.isPublic
        })
    ),

    findAll: jest.fn(
      (): Promise<Playlist[]> =>
        Promise.resolve([
          {
            _id: new Types.ObjectId(validPlaylistId),
            name: 'Playlist 1',
            musics: [],
            createdBy: 'user1',
            isPublic: false
          }
        ])
    ),

    findOne: jest.fn(
      (id: string): Promise<Playlist> =>
        Promise.resolve({
          _id: new Types.ObjectId(id),
          name: 'Playlist 1',
          musics: [],
          createdBy: 'user1',
          isPublic: false
        })
    ),

    update: jest.fn(
      (id: string, dto: UpdatePlaylistDto): Promise<Playlist> =>
        Promise.resolve({
          _id: new Types.ObjectId(id),
          name: dto.name ?? 'Default Playlist Name',
          musics: [],
          createdBy: dto.createdBy ?? 'Default playlist createdBy',
          isPublic: dto.isPublic ?? false
        } as Playlist)
    ),

    addMusic: jest.fn(
      (id: string, musicId: string): Promise<Playlist> =>
        Promise.resolve({
          _id: new Types.ObjectId(id),
          name: 'Playlist 1',
          musics: [new Types.ObjectId(musicId)],
          createdBy: 'user1',
          isPublic: false
        } as Playlist)
    ),

    remove: jest.fn(
      (ids: string[]): Promise<{ deletedCount: number }> =>
        Promise.resolve({ deletedCount: ids.length })
    ),

    removeMusics: jest.fn(
      (id: string): Promise<Playlist> =>
        Promise.resolve({
          _id: new Types.ObjectId(id),
          name: 'Playlist 1',
          musics: [],
          createdBy: 'user1',
          isPublic: false
        })
    )
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistsController],
      providers: [
        {
          provide: PlaylistsService,
          useValue: mockPlaylistsService
        }
      ]
    }).compile()

    controller = module.get<PlaylistsController>(PlaylistsController)
    service = module.get<PlaylistsService>(PlaylistsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a playlist', async () => {
    const dto: CreatePlaylistDto = {
      name: 'My Playlist',
      createdBy: 'teste',
      isPublic: true
    }

    const spy = jest.spyOn(service, 'create')
    const result = await controller.create(dto)

    expect(spy).toHaveBeenCalledWith(dto)
    expect(result).toHaveProperty('_id')
    expect(result.name).toBe(dto.name)
  })

  it('should return all playlists', async () => {
    const spy = jest.spyOn(service, 'findAll')
    const result = await controller.findAll()

    expect(spy).toHaveBeenCalled()
    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toHaveProperty('name')
  })

  it('should return one playlist by id', async () => {
    const id = validPlaylistId
    const spy = jest.spyOn(service, 'findOne')
    const result = await controller.findOne(id)

    expect(spy).toHaveBeenCalledWith(id)
    expect(result).toHaveProperty('_id')
    expect(result?._id.toString()).toBe(id)
  })

  it('should update a playlist', async () => {
    const id = validPlaylistId
    const dto: UpdatePlaylistDto = { name: 'Updated Playlist' }
    const spy = jest.spyOn(service, 'update')
    const result = await controller.update(id, dto)

    expect(spy).toHaveBeenCalledWith(id, dto)
    expect(result).toHaveProperty('name', dto.name)
  })

  it('should add music to playlist', async () => {
    const id = validPlaylistId
    const musicId = validMusicId
    const spy = jest.spyOn(service, 'addMusic')
    const result = await controller.addMusic(id, musicId)

    expect(spy).toHaveBeenCalledWith(id, musicId)
    // IDs dentro do array são ObjectIds, converter para string para comparação
    expect(result?.musics.map((m) => m.toString())).toContain(musicId)
  })

  it('should remove playlists by ids', async () => {
    const ids = [validPlaylistId, new Types.ObjectId().toString()]
    const spy = jest.spyOn(service, 'remove')
    const result = await controller.remove({ ids })

    expect(spy).toHaveBeenCalledWith(ids)
    expect(result.deletedCount).toBe(ids.length)
  })

  it('should remove musics from playlist', async () => {
    const id = validPlaylistId
    const musicIds = [validMusicId, new Types.ObjectId().toString()]
    const spy = jest.spyOn(service, 'removeMusics')
    const result = await controller.removeMusics(id, { ids: musicIds })

    expect(spy).toHaveBeenCalledWith(id, musicIds)
    expect(result).toHaveProperty('_id')
    expect(result?._id.toString()).toBe(id)
  })
})
