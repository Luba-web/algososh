import { circle } from './constants';

describe('Тестирование работоспособности Фибоначчи', () => {
  before(() => {
    cy.visit('fibonacci');
  });

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').clear();
    cy.contains('Рассчитать').should('be.disabled');
  });

  it('числа генерируются корректно', () => {
    cy.clock();
    cy.reload();
    cy.get('input').type('4').should('have.value', '4');
    cy.contains('Рассчитать').click();
    cy.get(circle).should('have.length', '1').last().contains('1');
    cy.tick(500);
    cy.get(circle).should('have.length', '2').last().contains('1');
    cy.tick(500);
    cy.get(circle).should('have.length', '3').last().contains('2');
    cy.tick(500);
    cy.get(circle).should('have.length', '4').last().contains('3');
    cy.tick(500);
    cy.get(circle).should('have.length', '5').last().contains('5');
  });
});
