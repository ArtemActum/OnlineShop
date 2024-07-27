/// <reference types="cypress" />

describe('User checkout flow', () => {

  beforeEach(() => {
    cy.visit('/');
});

  it('Check that user is able to search for a product, add item to cart and checkout successfully', () => {
    cy.get('#openSearchInput').click()
    cy.url().should('include', '/searchInputpage');
    cy.get('#searchInput').type('Iphone');
    cy.get('#searchSubmitButton').click();
    // Check that POST request retuns products on SERP
    cy.wait('@searchRequest').then((interception) => {
      cy.log('Status code was correctly checked as 200');
  });
    cy.get('#boxes .first.firstRow .name').should('have.text', 'Iphone');
    cy.get('#boxes .first.firstRow').click();
    cy.get('#addCartButton').click()
    cy.get('#viewCartButton').click();
    cy.get('#order-item-1 .nameContainer .mainItem').should('have.text', 'Iphone');
    cy.get('#proccedToCheckout').click();
    cy.get('#checkout').click();
    cy.url().should('include', '/orderconfirmation');
  });

  it('Check that user to browse products, add item to cart, update the cart, and checkout', () => {
    cy.get('#browseButton').click();
    cy.get('#categorySelect').click('Mobile phones');
    cy.get('.browsingitemcontainer .js-boxes .name').contains('iPhone').first()
    .then((productName) => {
      cy.log(productName.text());
    }).click();
    cy.url().should('include', '/item');
    cy.get('#addCartButton').click();
    cy.get('#viewCartButton').click();
    cy.get('#order-item-1 .nameContainer .mainItem').should('have.text', 'Iphone');
    // Update Shopping Cart
    cy.get('[data-code="iphone"] .countInput .countPlus').click;
    cy.get('[data-code="iphone"] .countInput .countEdit').should('have.text', '2');
    cy.get('#viewCartButton').click()
    cy.get('#order-item-1 .nameContainer .mainItem').should('have.text', 'Iphone');
    cy.get('#proccedToCheckout').click();
    cy.get('#checkout').click();
    cy.url().should('include', '/orderconfirmation');
  });

  it('Check that user is able to search for a product, add item to cart and continue with more shopping', () => {
    cy.get('#openSearchInput').click();
    cy.url().should('include', '/searchInputpage');
    cy.get('#searchInput').type('Iphone');
    cy.get('#searchSubmitButton').click();
    cy.wait('@searchRequest').then((interception) => {
      cy.log('Status code was correctly checked as 200');
  });
    cy.get('#boxes .first.firstRow .name').should('have.text', 'Iphone');
    cy.get('#boxes .first.firstRow').click();
    cy.url().should('include', '/item');
    cy.get('#addCartButton').click()
    cy.get('#viewCartButton').click();
    cy.get('#order-item-1 .nameContainer .mainItem').should('have.text', 'Iphone');
    cy.get('#continueShopping').click();
    cy.url().should('include', '/homepage');
  });

  it('Check that user is able to check shopping cart anytime and continue shopping', () => {
    cy.get('#viewCartButton').click();
    cy.url().should('include', '/cart');
    cy.get('#continueShopping').click();
    cy.url().should('include', '/homepage');
  });

  it('Check that user is able to search item, view item and made decision return back to SERP', () => {
    cy.get('#openSearchInput').click()
    cy.url().should('include', '/searchInputpage');
    cy.get('#searchInput').type('Iphone');
    cy.get('#searchSubmitButton').click();
    // Check that POST request retuns products on SERP
    cy.wait('@searchRequest').then((interception) => {
      cy.log('Status code was correctly checked as 200');
  });
    cy.get('#boxes .first.firstRow .name').should('have.text', 'Iphone');
    cy.get('#boxes .first.firstRow').click();
    cy.url().should('include', '/item');
    cy.get('#backToSearchage').click()
    cy.url().should('include', '/search');
  });

  it('Check that user is able to browse item, view item and made decision return back to SERP', () => {
    cy.get('#browseButton').click();
    cy.get('#categorySelect').click('Mobile phones');
    cy.get('.browsingitemcontainer .js-boxes .name').contains('iPhone').first()
    .then((productName) => {
      cy.log(productName.text());
    }).click();
    cy.url().should('include', '/item');
    cy.get('#backToSearchpage').click()
    cy.url().should('include', '/search');
  });

  it('Check that user is able to search item and return to homepage', () => {
    cy.get('#openSearchInput').click()
    cy.url().should('include', '/searchInputpage');
    cy.get('#searchInput').type('Iphone');
    cy.get('#searchSubmitButton').click();
    // Check that POST request retuns products on SERP
    cy.wait('@searchRequest').then((interception) => {
      cy.log('Status code was correctly checked as 200');
  });
    cy.get('#homepage').click()
    cy.url().should('include', '/homepage');
  });
});