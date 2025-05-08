describe('Automação de API', () => {
    it('Cria um novo usuario',()=>{
        cy.fixture("user").then(function(user){
            const cria = user.cria
            cy.api({
                method:'POST',
                url:'http://localhost:3000/users',
                body:cria
            }).then((response)=>{
                expect(response.status).to.eq(201)
                expect(response.body.mensagem).to.eq('Usuário cadastrado com sucesso')
                Cypress.env('id', response.body.id)})
        })
    })
    it('Excluir usuário',()=>{
        cy.api({
            method:'DELETE',
            url:`http://localhost:3000/users/${Cypress.env('id')}`,
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.mensagem).to.eq('Usuário excluído com sucesso')})
    })
})