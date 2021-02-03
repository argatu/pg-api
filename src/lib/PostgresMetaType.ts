import { literal } from 'pg-format'
import { DEFAULT_SYSTEM_SCHEMAS } from './constants'
import { typesSql } from './sql'
import { PostgresMetaResult, PostgresType } from './types'

export default class PostgresMetaType {
  query: Function

  constructor(query: Function) {
    this.query = query
  }

  async list({ includeSystemSchemas = false } = {}): Promise<PostgresMetaResult<PostgresType[]>> {
    const sql = includeSystemSchemas
      ? typesSql
      : `${typesSql} AND NOT (n.nspname IN (${DEFAULT_SYSTEM_SCHEMAS.map(literal).join(',')}));`
    return await this.query(sql)
  }
}
