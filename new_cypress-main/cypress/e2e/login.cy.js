import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json";
import * as result_page from "../locators/result_page.json";


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверили цвет кнопки восст парроль
        
     });


    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // Проверить, что крестик виден пользователю
        
     });


    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); // Найти поле логин и ввести верный логин
         cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести верный пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

         cy.wait(500);

         cy.get(result_page.title).contains('Авторизация прошла успешно');  // Проверить на совпадение текст
         cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
        
     })

    it('Проверка логики восстановления пароля:', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Найти кнопку забыли пароль и нажать на нее

        cy.get(recovery_password_page.email).type(data.login); // Найти поле email и ввести почту для восстановления
        cy.get(recovery_password_page.send_button).click(); // Найти кнопку отправить код и нажать на нее

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');  // Проверить на совпадение текст
        cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю

     }) 

    it('Верный логин и неверный пароль', function () {
         cy.get(main_page.email).type(data.login); // Найти поле логин и ввести верный логин
         cy.get(main_page.password).type('iLoveqastudio13'); // Найти поле пароль и ввести неверный пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

         cy.get(result_page.title).contains('Такого логина или пароля нет');  // Проверить на совпадение текст
         cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
         
     })

    it('Неверный логин и верный пароль', function () {
         cy.get(main_page.email).type('ne_german@dolnikov.ru'); // Найти поле логин и ввести неверный логин
         cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести верный пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

         cy.get(result_page.title).contains('Такого логина или пароля нет');  // Проверить на совпадение текст
         cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
         
     })

    it('Проверка, что в логине есть @', function () {
         cy.get(main_page.email).type('germandolnikov.ru'); // Найти поле логин и ввести логин без @
         cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести верный пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

         cy.get(result_page.title).contains('Нужно исправить проблему валидации');  // Проверить на совпадение текст
         cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
         
     })

    it('Проверка на приведение к строчным буквам в логине', function () {
         cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Найти поле логин и ввести верный логин с заглавными буквами
         cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести верный пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

         cy.get(result_page.title).contains('Авторизация прошла успешно');  // Проверить на совпадение текст
         cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
         
     })

 
       
 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 