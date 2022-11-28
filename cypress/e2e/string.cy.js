describe('Тестирование строки е2е', () => {
  before(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('Проверка, если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').clear();
    cy.contains('Развернуть').should('be.disabled');
  });

  it('строка разворачивается корректно', () => {
    cy.get('input').type('12345');
    cy.get('button').contains('Развернуть').click();

    cy.get('li').should('have.length', 5);

    cy.get('li').eq(0).find('[class*=circle_default]').contains('1');
    cy.get('li').eq(1).find('[class*=circle_default]').contains('2');
    cy.get('li').eq(2).find('[class*=circle_default]').contains('3');
    cy.get('li').eq(3).find('[class*=circle_default]').contains('4');
    cy.get('li').eq(4).find('[class*=circle_default]').contains('5');

    cy.wait(500);

    cy.get('li').eq(0).find('[class*=circle_modified]').contains('5');
    cy.get('li').eq(1).find('[class*=circle_changing]').contains('2');
    cy.get('li').eq(2).find('[class*=circle_default]').contains('3');
    cy.get('li').eq(3).find('[class*=circle_changing]').contains('4');
    cy.get('li').eq(4).find('[class*=circle_modified]').contains('1');

    cy.wait(500);

    cy.get('li').eq(0).find('[class*=circle_modified]').contains('5');
    cy.get('li').eq(1).find('[class*=circle_modified]').contains('4');
    cy.get('li').eq(2).find('[class*=circle_modified]').contains('3');
    cy.get('li').eq(3).find('[class*=circle_modified]').contains('2');
    cy.get('li').eq(4).find('[class*=circle_modified]').contains('1');
  });
});
