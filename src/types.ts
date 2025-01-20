
export interface EventData {
    duration: number,
    end: string,
    event: string,
    host: string,
    href: string,
    id: number,
    n_problems: null,
    n_statistics: null | number,
    parsed_at:null | string,
    problems: null | any,
    resource: string,
    resource_id: number,
    start: string,
}

export interface EventDataResponse {
    meta:meta,
    objects:EventData[]
}

interface meta{
    limit:number,
    next:null | string,
    offset:number,
    previous:null | string,
    total_count:number
}