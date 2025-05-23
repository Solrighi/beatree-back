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

  findOne(id: number) {
    return `This action returns a #${id} music`
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`
  }

  remove(id: number) {
    return `This action removes a #${id} music`
  }
}
