import { describe } from "node:test";
import { beforeAll, expect, it  } from "vitest";


describe('Testes do microserviço CHECKOUT...', () => {
    // beforeAll( async ()=> {

    // });

     it('Deve verificar se mensagem está correga...', async () => {
        const response = 1 ;
        expect(response).toBe(1);
        expect(response > 0);

    });

    // it('Não deve validar usuario com nome menor de 3 caracteres.',  () => {
    //     expect( () => {
    //         const request = new UserRequest('ta','tales@gmail.com', '1234567890');
    //     }).toThrow('Name must be at least 3 characters long');
    // });


});