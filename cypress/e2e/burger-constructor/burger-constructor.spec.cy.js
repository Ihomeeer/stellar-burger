const totalPrice = 3937;

describe('соединение с сервером, загрузка нужной страницы и содержимого', function () {
  before(function () {
    cy.visit('http://localhost:3000');
    cy.visit('http://localhost:3000/login');
    cy.get('[name=email]').type('mihailkirichkov@yandex.ru');
    cy.get('[name=password]').type('qqqqqqqq');
    cy.get('button').contains('Войти').click();
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', { fixture: 'login.json' });
  });

  it('должна рисоваться страница с ингредиентами и конструктором', function () {
    cy.contains('Конструктор');
    cy.contains('Соберите бургер');
    cy.contains('Булки');
    cy.contains('Соусы');
    cy.contains('Начинки');
    cy.get('[class^=button_button__]').contains('Оформить заказ').should('be.disabled');
  });
});

describe('открытие-закрытие модалки', function () {
  it('должна открываться модалка с ингредиентом', function () {
    cy.get('li a div').first().click({ multiple: true, force: true });
    cy.contains('Детали ингредиента');
    cy.contains('Конструктор');
  });

  it('должна закрываться модалка с ингредиентом', function () {
    cy.get('[class^=Modal_closeButton__]').last().click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('клики на табы с ингредиентами', function () {
  it('Дожен произойти скролл на "начинки"', function () {
    cy.get('[class^=tab_tab__]').eq(2).click();
    cy.get('h3').contains('Начинки').scrollIntoView().should('be.visible');
  });

  it('Дожен произойти скролл на "соусы"', function () {
    cy.get('[class^=tab_tab__]').eq(1).click();
    cy.get('h3').contains('Соусы').scrollIntoView().should('be.visible');
  });

  it('Дожен произойти скролл на "булки"', function () {
    cy.get('[class^=tab_tab__]').eq(0).click();
    cy.get('h3').contains('Булки').scrollIntoView().should('be.visible');
  });
});

describe('перетаскивание и тасовка ингредиентов в конструкторе, изменение их счетчиков', function () {
  it('Должно осуществиться перетаскивание булки в конструктор и увеличение счетчика', function () {
    cy.get('[class^=BurgerConstructor_listContainer__]').as('constructorDropArea');
    cy.get('[class^=BurgerIngredients_list__]').contains('Краторная булка N-200i').as('bun');
    cy.get('@bun').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@bun').find('[class^=counter_counter__]').as('counter');
    cy.get('@counter').should('contain', 2);
  });

  it('Должно осуществиться перетаскивание соуса в конструктор и увеличение счетчика', function () {
    cy.get('[class^=BurgerConstructor_listContainer__]').as('constructorDropArea');
    cy.get('[class^=BurgerIngredients_list__]').contains('Соус Spicy-X').as('sauce');
    cy.get('@sauce').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@sauce').find('[class^=counter_counter__]').as('counter');
    cy.get('@counter').should('contain', 1);
  });

  it('Должно осуществиться удаление соуса из конструктора и обнуление счетчика', function () {
    cy.get('[class^=BurgerConstructor_listContainer__]').as('constructorDropArea');
    cy.get('[class^=BurgerIngredients_list__]').contains('Соус Spicy-X').as('sauce');
    cy.get('[class^=constructor-element]').eq(11).click();
    cy.get('@sauce').find('[class^=counter_counter__]').should('not.exist');
  });

  it('Должно осуществиться повторное перетаскивание соуса в конструктор и увеличение счетчика', function () {
    cy.get('[class^=BurgerConstructor_listContainer__]').as('constructorDropArea');
    cy.get('[class^=BurgerIngredients_list__]').contains('Соус Spicy-X').as('sauce');
    cy.get('@sauce').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@sauce').find('[class^=counter_counter__]').as('counter');
    cy.get('@counter').should('contain', 1);
  });

  it('Должно осуществиться перетаскивание ингредиента в конструктор и увеличение счетчика', function () {
    cy.get('[class^=BurgerConstructor_listContainer__]').as('constructorDropArea');
    cy.get('[class^=BurgerIngredients_list__]').contains('Мясо бессмертных моллюсков Protostomia').as('ingr');
    cy.get('@ingr').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@ingr').find('[class^=counter_counter__]').as('counter');
    cy.get('@counter').should('contain', 1);
  });

  it('Должна осуществиться тасовка двух ингредиентов', function () {
    cy.get('[class^=BurgerConstructor_listItem__]').last().as('firstEl');
    cy.get('[class^=BurgerConstructor_listItem__]').first().as('SecondEl');
    cy.get('@firstEl').trigger("dragstart").trigger("dragleave");
    cy.get('@SecondEl').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
    cy.get('[class^=BurgerConstructor_listItem__]').first().as('dragEl');
    cy.get('[class^=BurgerConstructor_listItem__]').last().as('dropEl');
    cy.get('@dragEl').trigger("dragstart").trigger("dragleave");
    cy.get('@dropEl').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
  })
});

describe('общая цена и активная кнопка заказа', function () {
  it('должна измениться общая цена', function () {
    cy.get('[class^=BurgerConstructor_lowerPanel__] p').contains(totalPrice);
  });

  it('должна включиться кнопка "оформить заказ"', function () {
    cy.get('[class^=button_button__]').contains('Оформить заказ').should('not.be.disabled');
  });
});

describe('попытка отправить заказ на сервер', function () {
  it('должен отправиться POST-запрос', function () {
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' });
    cy.get('[class^=button_button__]').contains('Оформить заказ').click();
  });
  it('должна вылупиться модалка с номером заказа', function () {
    cy.contains('17575');
  });
  it('должна закрыться модалка с номером заказа и отключиться кнопка оформления', function () {
    cy.get('[class^=Modal_closeButton__]').first().click();
    cy.get('[class^=ModalOrder_number__]').contains('17575').should('not.exist');
    cy.get('[class^=button_button__]').contains('Оформить заказ').should('be.disabled');
  });
});