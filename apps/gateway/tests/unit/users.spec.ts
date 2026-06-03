import { describe } from "node:test";
import { beforeAll, expect, it  } from "vitest";
import { UserRequest } from '../../src/core/domain/user/UserRequest';

describe('Testes de unidade do usuário...', () => {
    // beforeAll( async ()=> {

    // });


    it('Não deve validar usuario com nome menor de 3 caracteres.',  () => {
        expect( () => {
            const request = new UserRequest('ta','tales@gmail.com', '1234567890');
        }).toThrow('Name must be at least 3 characters long');
    });

    it('Não deve validar usuario com email faltando domínio.', async () => {
        expect( () => {
            const request = new UserRequest('tales','tales@gmail', '1234567890');
        }).toThrow('Invalid email format');
    });

    it('Não deve validar usuario com email inválido.', async () => {
        expect( () => {
            const request = new UserRequest('tales','talesgmail', '1234567890');
        }).toThrow('Invalid email format');
    });

    it('Não deve validar usuario com tamanho da senha pequena.', async () => {
        expect( () => {
            const request = new UserRequest('tales','tales@gmail.com', '123456');
        }).toThrow('Password must be at least 8 characters long');
    });


});