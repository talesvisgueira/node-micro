import { app } from '../../src/app';
import { beforeAll, expect, it } from 'vitest';
import  request  from 'supertest';
import { describe } from 'node:test';

describe('Testes da tela HOME...', () => {
    beforeAll( async ()=> {
        await app.ready();
    });

    it('Testar retorno da tela home...', async () => {
        const response = await request(app.server).get('/home') ;
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual({ name: 'Tela home...' });
    });

});