import { Injectable } from '@nestjs/common'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { UpdatePlaylistDto } from './dto/update-playlist.dto'
import { Playlist } from './schemas/playlist.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>
  ) {}

  create(createPlaylistDto: CreatePlaylistDto) {
    const createdPlaylist = new this.playlistModel(createPlaylistDto)
    return createdPlaylist.save()
  }

  findAll() {
    return this.playlistModel.find().populate('musics')
  }

  findOne(id: string) {
    return this.playlistModel
      .findOne({
        _id: id
      })
      .populate('musics')
  }

  update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    const existingPlaylist = this.playlistModel.findOneAndUpdate(
      { _id: id },
      updatePlaylistDto,
      { new: true }
    )
    return existingPlaylist
  }

  remove(ids: string[]) {
    return this.playlistModel.deleteMany({
      _id: { $in: ids }
    })
  }

  addMusic(id: string, musicId: string) {
    const updatedPlaylist = this.playlistModel.findOneAndUpdate(
      { _id: id },
      { $push: { musics: musicId } },
      { new: true, runValidators: true }
    )
    return updatedPlaylist
  }

  removeMusics(id: string, musicIds: string[]) {
    const updatedPlaylist = this.playlistModel.findOneAndUpdate(
      { _id: id },
      { $pull: { musics: { $in: musicIds } } },
      { new: true, runValidators: true }
    )
    return updatedPlaylist
  }
}
