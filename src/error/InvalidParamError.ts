import { BaseError } from './BaseError'

export class InvalidParamError extends BaseError {
  constructor(name: string, value: unknown) {
    super(4001, `invalid param: ${name}, value: ${value}`)
  }
}
