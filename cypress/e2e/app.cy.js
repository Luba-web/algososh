describe('Тестирование работоспособности приложения', () => {
  it('Приложение загружено', () => {
    cy.visit('localhost:3000');
  });
});
