import { app } from '../../src/app';
import { beforeAll, describe, expect, it } from 'vitest';
import  supertest  from 'supertest';


describe('Testes da tela PROJETOS...', () => {
    beforeAll( async ()=> {
        await app.ready();
    });
    it('Testar tela de projetos...', async () => {
        const response = await supertest(app.server).get('/projetos') ;
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual({ name: 'Tela de projetos...' });
    });
});