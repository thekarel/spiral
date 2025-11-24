import {LinearClient} from '@linear/sdk'

export const getLinearClient = (apiKey: string) => new LinearClient({apiKey})
