const user = require('../fixtures/user.json') 
describe('Automação de API', () => {
    it('Cria um novo usuario',()=>{
        cy.visit('http://localhost:5173/')
        cy.contains('Registre-se').click()
        cy.get('#nome').type(user.cria.nome)
        cy.get('#email').type(user.cria.email)
        cy.get('#profissao').type(user.cria.profissao)
        cy.get('#idade').type(user.cria.idade)
        cy.get('#senha').type(user.cria.senha)
        cy.contains('Cadastrar').click()
        cy.contains('Cadastro realizado com sucesso!').should('be.visible')
    })
})