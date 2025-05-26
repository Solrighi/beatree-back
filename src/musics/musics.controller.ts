import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { MusicsService } from './musics.service'
import { CreateMusicDto, CreateMusicSchema } from './dto/create-music.dto'
import { UpdateMusicDto, UpdateMusicSchema } from './dto/update-music.dto'
import { ZodValidationPipe } from 'src/zod/ZodValidationPipe'

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateMusicSchema))
    createMusicDto: CreateMusicDto
  ) {
    return this.musicsService.create(createMusicDto)
  }

  @Get()
  findAll() {
    return this.musicsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateMusicSchema))
    updateMusicDto: UpdateMusicDto
  ) {
    return this.musicsService.update(id, updateMusicDto)
  }

  @Delete()
  remove(@Body() { ids }: { ids: string[] }) {
    return this.musicsService.remove(ids)
  }
}
