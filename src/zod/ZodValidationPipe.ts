import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodSchema, ZodError } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: unknown): any {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join('; ')

        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.errors,
          formatted: message
        })
      }

      throw new BadRequestException('Unknown validation error')
    }
  }
}
