import {readFileSync} from 'fs'
import {parse} from 'yaml';

export const getSwaggerDoc = () => {
    const file = readFileSync('./doc/api.yaml', 'utf8')
    return parse(file)
}