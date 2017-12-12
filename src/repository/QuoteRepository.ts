import * as JsonQuery from 'json-query'
import { QUOTES } from '../data/quotes'

export default function (reqQuery: any): any {
    const keys = Object.keys(reqQuery)
    const queryComponents = keys.map((k) => {
        return '*' + k + '=' + reqQuery[k]
    })
    const query = '[' + queryComponents.join(" & ") + ']'
    return JsonQuery(query, {data: QUOTES}).value
}

/*
export module QuoteRepositoryModule {
    export class QuoteRepository {
        findByQuery(reqQuery: any): any {
            const keys = Object.keys(reqQuery)
            const queryComponents = keys.map((k) => {
                return '*' + k + '=' + reqQuery[k]
            })
            const query = '[' + queryComponents.join(" & ") + ']'
            return JsonQuery(query, {data: QUOTES}).value
        }
    }
}
*/