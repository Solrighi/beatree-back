import { Test, TestingModule } from '@nestjs/testing'
import { PlaylistsService } from './playlists.service'
import { getModelToken } from '@nestjs/mongoose'
import { Playlist } from './schemas/playlist.schema'

describe('PlaylistsService', () => {
  let service: PlaylistsService

  const mockPlaylistModel = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteMany: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistsService,
        {
          provide: getModelToken(Playlist.name),
          useValue: mockPlaylistModel
        }
      ]
    }).compile()

    service = module.get<PlaylistsService>(PlaylistsService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a playlist', async () => {
    const dto = { name: 'New Playlist', createdBy: 'teste', isPublic: false }
    const createdPlaylist = { _id: '1', ...dto }
    mockPlaylistModel.create.mockResolvedValue(createdPlaylist)

    const result = await service.create(dto)

    expect(mockPlaylistModel.create).toHaveBeenCalledWith(dto)
    expect(result).toEqual(createdPlaylist)
  })

  it('should find all playlists', async () => {
    const playlists = [{ _id: '1', name: 'Playlist 1' }]
    const execMock = jest.fn().mockResolvedValue(playlists)
    const populateMock = jest.fn(() => ({ exec: execMock }))
    mockPlaylistModel.find.mockReturnValue({ populate: populateMock })

    const result = await service.findAll()

    expect(mockPlaylistModel.find).toHaveBeenCalled()
    expect(populateMock).toHaveBeenCalledWith('musics')
    expect(execMock).toHaveBeenCalled()
    expect(result).toEqual(playlists)
  })

  it('should find one playlist by id', async () => {
    const playlist = { _id: '1', name: 'Playlist 1' }
    const execMock = jest.fn().mockResolvedValue(playlist)
    const populateMock = jest.fn(() => ({ exec: execMock }))
    mockPlaylistModel.findOne.mockReturnValue({ populate: populateMock })

    const result = await service.findOne('1')

    expect(mockPlaylistModel.findOne).toHaveBeenCalledWith({ _id: '1' })
    expect(populateMock).toHaveBeenCalledWith('musics')
    expect(execMock).toHaveBeenCalled()
    expect(result).toEqual(playlist)
  })

  it('should update a playlist', async () => {
    const updateDto = { name: 'Updated Playlist' }
    const updatedPlaylist = { _id: '1', ...updateDto }
    const execMock = jest.fn().mockResolvedValue(updatedPlaylist)
    mockPlaylistModel.findOneAndUpdate.mockReturnValue({ exec: execMock })

    const result = service.update('1', updateDto)

    expect(mockPlaylistModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: '1' },
      updateDto,
      { new: true }
    )
    await expect(result).resolves.toEqual(updatedPlaylist)
    expect(execMock).toHaveBeenCalled()
  })

  it('should remove playlists by ids', async () => {
    const ids = ['1', '2']
    const deleteResult = { deletedCount: 2 }
    mockPlaylistModel.deleteMany.mockResolvedValue(deleteResult)

    const result = service.remove(ids)

    expect(mockPlaylistModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: ids }
    })
    await expect(result).resolves.toEqual(deleteResult)
  })

  it('should add music to playlist', async () => {
    const id = '1'
    const musicId = 'music123'
    const updatedPlaylist = { _id: id, musics: [musicId] }
    const execMock = jest.fn().mockResolvedValue(updatedPlaylist)
    mockPlaylistModel.findOneAndUpdate.mockReturnValue({ exec: execMock })

    const result = service.addMusic(id, musicId)

    expect(mockPlaylistModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id },
      { $push: { musics: musicId } },
      { new: true, runValidators: true }
    )
    await expect(result).resolves.toEqual(updatedPlaylist)
    expect(execMock).toHaveBeenCalled()
  })

  it('should remove musics from playlist', async () => {
    const id = '1'
    const musicIds = ['music1', 'music2']
    const updatedPlaylist = { _id: id, musics: [] }
    const execMock = jest.fn().mockResolvedValue(updatedPlaylist)
    mockPlaylistModel.findOneAndUpdate.mockReturnValue({ exec: execMock })

    const result = service.removeMusics(id, musicIds)

    expect(mockPlaylistModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id },
      { $pull: { musics: { $in: musicIds } } },
      { new: true, runValidators: true }
    )
    await expect(result).resolves.toEqual(updatedPlaylist)
    expect(execMock).toHaveBeenCalled()
  })
})
