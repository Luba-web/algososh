describe('Тестирование работоспособности Стека', () => {
  before(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').clear();
    cy.contains('Добавить').should('be.disabled');
  });

  it('проверка добавления элемента в очередь', () => {
    cy.reload();
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(0).contains('1');
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.get('li').eq(0).contains('top');
    cy.wait(500);

    cy.get('input').type('2');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(1).contains('2');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_default]');
    cy.get('li').eq(1).contains('top');
    cy.wait(500);
  });

  it('проверка удаления элемента из очереди', () => {
    cy.reload();
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(0).contains('1');
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.get('li').eq(0).contains('top');
    cy.wait(500);

    cy.get('input').type('2');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(1).contains('2');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_default]');
    cy.get('li').eq(1).contains('top');
    cy.wait(500);

    cy.get('button').contains('Удалить').click();
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.wait(500);
    cy.get('li').eq(0).contains('top');

    cy.get('button').contains('Удалить').click();
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').should('have.length', 0);
    cy.wait(500);
  });

  it('проверка поведение кнопки «Очистить»', () => {
    cy.reload();
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(0).contains('1');
    cy.get('li').eq(0).find('[class*=circle_changing]');
    cy.get('li').eq(0).find('[class*=circle_default]');
    cy.get('li').eq(0).contains('top');
    cy.wait(500);

    cy.get('input').type('2');
    cy.get('button').contains('Добавить').click();
    cy.get('li').eq(1).contains('2');
    cy.get('li').eq(1).find('[class*=circle_changing]');
    cy.get('li').eq(1).find('[class*=circle_default]');
    cy.get('li').eq(1).contains('top');
    cy.wait(500);

    cy.get('button').contains('Очистить').click();
    cy.get('li').should('have.length', 0);
  });
});
