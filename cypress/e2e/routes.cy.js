describe('Тестирование переходов по страницам', () => {
  it('Доступно на localhost:3000', function () {
    cy.visit('http://localhost:3000/');
  });

  beforeEach(function () {
    cy.visit('http://localhost:3000/');
  });

  it('Открыта страница строки - recursion', function () {
    cy.get('a[href*="recursion"]').click();
    cy.contains('Строка');
  });

  it('Открыта страница фибоначчи - fibonacci', function () {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('Открыта страница сортировки массива - sorting', function () {
    cy.get('a[href*="sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('Открыта страница стека - stack', function () {
    cy.get('a[href*="stack"]').click();
    cy.contains('Стек');
  });

  it('Открыта страница очереди - queue', function () {
    cy.get('a[href*="queue"]').click();
    cy.contains('Очередь');
  });

  it('Открыта страница связного список - list', function () {
    cy.get('a[href*="list"]').click();
    cy.contains('Связный список');
  });
});
