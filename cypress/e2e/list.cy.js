describe('Тестирование работоспособности Связного списока', () => {
  before(() => {
    cy.visit('http://localhost:3000/list');
  });

  it('если в инпуте пусто, то кнопки добавления недоступны и удаления по индексу', () => {
    cy.get('input').first().clear();
    cy.contains('Добавить в head').should('be.disabled');
    cy.contains('Добавить в tail').should('be.disabled');
    cy.contains('Добавить по индексу').should('be.disabled');
    cy.get('input').last().clear();
    cy.contains('Удалить по индексу').should('be.disabled');
  });

  it('отрисовка дефолтного списка', () => {
    cy.get('ul').children().should('not.have.length', '0');
    cy.get('li').first().contains('head');
    cy.get('li').last().contains('tail');
  });

  it('добавление элемента в head', () => {
    cy.reload();
    cy.get('input').first().type('hi');
    cy.get('button').contains('Добавить в head').click();
    cy.get('li').eq(0).contains('hi');
    cy.wait(500);
    cy.get('li').eq(0).find('[class*=circle_modified]');
    cy.wait(500);
    cy.get('li').eq(0).contains('hi');
    cy.get('li').eq(0).contains('head');
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.get('li').should('have.length', 5);
  });

  it('добавление элемента в tail', () => {
    cy.reload();
    cy.get('input').first().type('hi');
    cy.get('button').contains('Добавить в tail').click();
    cy.get('li').eq(3).contains('hi');
    cy.wait(1000);
    cy.get('li').eq(4).find('[class*=circle_modified]');
    cy.get('li').eq(4).contains('hi');
    cy.get('li').eq(4).contains('tail');
    cy.get('li').eq(4).find('[class*=circle_default]');
    cy.get('li').should('have.length', 5);
  });

  it('добавление элемента по индексу', () => {
    cy.reload();
    cy.get('input').first().type('5');
    cy.get('input').last().type('2');
    cy.get('button').contains('Добавить по индексу').click();
    cy.get('li').eq(0).contains('5');
    cy.wait(500);
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(1).contains('5');
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.wait(500);
    cy.get('li').eq(2).contains('5');
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(2).find('[class*=circle_changing]');
    cy.get('li').eq(2).find('[class*=circle_modified]');
    cy.get('li').eq(2).contains('5');
    cy.get('li').eq(2).find('[class*=circle_default]');
    cy.get('li').should('have.length', 5);
  });

  it('удаление элемента из head', () => {
    cy.reload();
    cy.get('li').should('have.length', 4);
    cy.get('button').contains('Удалить из head').click();
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(0).contains('head');
    cy.wait(1000);
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.get('li').eq(0).contains('head');
    cy.get('li').should('have.length', 3);
  });

  it('удаление элемента из tail', () => {
    cy.reload();
    cy.get('li').should('have.length', 4);
    cy.get('button').contains('Удалить из tail').click();
    cy.get('li').eq(3).find('[class*=circle_changing]');
    cy.wait(1000);
    cy.get('li').eq(2).contains('tail');
    cy.get('li').eq(2).find('[class*=circle_default]');
    cy.get('li').should('have.length', 3);
  });

  it('удаление элемента по индексу', () => {
    cy.reload();
    cy.get('input').last().type('2');
    cy.get('button').contains('Удалить по индексу').click();
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.wait(500);
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.wait(500);
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(2).find('[class*=circle_changing]');
    cy.get('li').eq(2).find('[class*=circle_default]');
    cy.get('li').should('have.length', 3);
  });
});
