import { createUser } from "../user/createUser.js";

let usersInMemory = [];

describe("Criar Usuario", async () => {
    const user = await createUser({ 
        email: 'teste@email.com',
        name: 'Jhon Doe',
        picture: 'https://www.euax.com.br/wp-content/uploads/2019/10/Teste.png',
        username: 'usertest' 
    })
    
    it("Deve criar um usuario se todos os campos forem enviados", async ()=>{
        usersInMemory.push(user);

        //Verifica se o usuario foi criado, se foi ele deve ter um id
        expect(user).toHaveProperty("id")
    })  

    it("Não deve criar um usuario se o campo name não for enviado", async ()=>{

        expect(async()=> {
            await createUser({ 
                email: 'teste@email.com',
                picture: 'https://www.euax.com.br/wp-content/uploads/2019/10/Teste.png',
                username: 'usertest' 
               }, true);
        }).rejects.toBeInstanceOf(Error)
    })  

    it("Não deve criar um usuario se o campo email não for enviado", async ()=>{

        expect(async()=> {
            await createUser({ 
                name: 'Jhon Doe',
                picture: 'https://www.euax.com.br/wp-content/uploads/2019/10/Teste.png',
                username: 'usertest' 
               });
        }).rejects.toBeInstanceOf(Error)
    })  

    it("Não deve criar um usuario se o campo username não for enviado", async ()=>{

        expect(async()=> {
            await createUser({ 
                name: 'Jhon Doe',
                picture: 'https://www.euax.com.br/wp-content/uploads/2019/10/Teste.png',
                email: 'teste@email.com' 
               });
        }).rejects.toBeInstanceOf(Error)
    })  

    it("Não deve criar um usuario se o campo picture não for enviado", async ()=>{

        expect(async()=> {
            await createUser({ 
                name: 'Jhon Doe',
                username: 'usertest',
                email: 'teste@email.com' 
               });
        }).rejects.toBeInstanceOf(Error)
    })  
    
})