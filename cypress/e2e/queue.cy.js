describe('Тестирование работоспособности Очереди', () => {
  before(() => {
    cy.visit('http://localhost:3000/queue');
  });

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').clear();
    cy.contains('Добавить').should('be.disabled');
  });

  it('проверка добавления элемента в очередь', () => {
    cy.get('input').type('hi');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(0).contains('hi');
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.wait(500);
    cy.get('li').eq(0).contains('head');
    cy.get('li').eq(0).contains('tail');

    cy.get('input').type('3r3');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(1).contains('3r3');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_default]');
    cy.wait(500);
    cy.get('li').eq(1).contains('tail');
  });

  it('проверка удаления элемента из очереди', () => {
    cy.reload();
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(0).contains('1');
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.wait(500);

    cy.get('input').type('2');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(1).contains('2');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_default]');
    cy.wait(500);

    cy.get('input').type('3');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(2).contains('3');
    cy.get('li').eq(2).find('[class*=circle_changing]');
    cy.get('li').eq(2).find('[class*=circle_default]');
    cy.wait(500);

    cy.get('input').type('4');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(3).contains('4');
    cy.get('li').eq(3).find('[class*=circle_changing]');
    cy.get('li').eq(3).find('[class*=circle_default]');
    cy.wait(500);

    cy.get('button').contains('Удалить').click();
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.wait(500);
    cy.get('li').eq(1).contains('head');

    cy.get('button').contains('Удалить').click();
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_default]');
    cy.wait(500);
    cy.get('li').eq(2).contains('head');
  });

  it('проверка поведение кнопки «Очистить»', () => {
    cy.reload();
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(0).contains('1');
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.wait(500);

    cy.get('input').type('2');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(1).contains('2');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_default]');
    cy.wait(500);

    cy.get('button').contains('Очистить').click();
    cy.get('li').each((item) => {
      cy.wrap(item).should('not.have.text');
      cy.wrap(item).find('[class*=circle_default]');
    });
  });
});
