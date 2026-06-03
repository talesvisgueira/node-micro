import { describe } from "node:test";
import { beforeAll, expect, it  } from "vitest";
import { UserRegisterUseCase } from "../../src/core/useCases/users/UserRegisterUseCase";
import { UserMemoryRepository } from "../../src/infra/repositories/InMemoryRepository/UseMemoryRepository";
import { UserRequest } from '../../src/core/domain/user/UserRequest';

describe('Testes de integração do usuário...', () => {
    // beforeAll( async ()=> {

    // });


    it('Não deve cadastrar usuário com email existente...', async () => {
        const repository = new UserMemoryRepository();
        const userServece : UserRegisterUseCase = new UserRegisterUseCase(repository);

        const user = await userServece.execute(new UserRequest('tales','tales@gmail.com', '1234567890'));
        expect(repository.findByEmail('tales@gmail.com')).resolves.toEqual(user);
        expect(user.email).toEqual(expect.any(String));
        expect
    });

    it('Deve cadastrar novo usuário...', async () => {
        const repository = new UserMemoryRepository();
        const userServece : UserRegisterUseCase = new UserRegisterUseCase(repository);

        const user = await userServece.execute(new UserRequest('tales','tales@gmail.com', '1234567890'));
        expect(repository.findByEmail('tales@gmail.com')).resolves.toEqual(user);
        expect(user.email).toEqual(expect.any(String));
        expect
    });

});