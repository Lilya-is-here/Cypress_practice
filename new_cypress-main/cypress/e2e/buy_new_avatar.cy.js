describe('Проверка авторизации', function () {

    it('Верный логин и верный пароль', function () {
        cy.visit('https://pokemonbattle.ru/login');
        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); // ввести email
        cy.get('#password').type('USER_PASSWORD'); // ввести пароль
        cy.get('.auth__button').click(); // нажать кнопку

        cy.get('.level > .level__name').first().contains('Атака'); //проверяем что мы на странице покемонов

        cy.get('.header__btns > :nth-child(4)').click(); // переходим в магазин

        cy.get('.pokemon__title').contains('Магазин'); // проверяем, что мы перешли в магазин
        
        cy.get('.available > button').first().click(); // выбираем доступный аватар
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('639002000000000003'); // номер карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type('12/24'); // дата
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // код
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('IVANOV IVAN'); // имя
        cy.get('.pay-btn').click(); // оплатить

        // Подтверждение покупки
        cy.get('.payment__fielheader').contains('Подтверждение покупки'); 
        cy.get('#cardnumber').type('56456'); // вводим код
        cy.get('.payment__submit-button').click(); // отправляем код
        cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // получаем сообщение об успешной оплате
        cy.get('.payment__adv').click(); // Возвращаемся в магазин


        
         
    })


 
       
})
 