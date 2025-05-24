import { Injectable } from '@nestjs/common'
import { CreateMusicDto } from './dto/create-music.dto'
import { UpdateMusicDto } from './dto/update-music.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Music } from './schemas/music.schema'
import { Model } from 'mongoose'

@Injectable()
export class MusicsService {
  constructor(@InjectModel(Music.name) private musicModel: Model<Music>) {}

  create(createMusicDto: CreateMusicDto) {
    const createdMusic = new this.musicModel(createMusicDto)
    return createdMusic.save()
  }

  findAll() {
    return this.musicModel.find().exec()
  }

  findOne(id: string) {
    return this.musicModel.findOne({
      _id: id
    })
  }

  update(id: string, updateMusicDto: UpdateMusicDto) {
    const existingMusic = this.musicModel.findOneAndUpdate(
      { _id: id },
      updateMusicDto,
      { new: true }
    )
    return existingMusic
  }

  remove(ids: string[]) {
    return this.musicModel.deleteMany({
      _id: { $in: ids }
    })
  }
}
