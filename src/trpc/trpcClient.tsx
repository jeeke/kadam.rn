import { createClient } from '@jeeke/kadam-ts/trpc/client';
import {
    getSecureAccessToken
} from '../services/token.service';

export const trpc = createClient({
    baseUrl: 'https://trpc.kadam.guru/api/trpc',
    getAuthToken: async () => {
        return getSecureAccessToken()
    },
});

