/// <reference types="Cypress" />

// check also last code part at this page. Using Spying on POST request using cy.intercept

// Good code, but can be cleaner. See next commented code block using Cypress Commands = support
// describe("Todo UI testing", () => {
//   beforeEach(() => {
//     cy.visit("/");
//   });
//   it("Should add a new Todo correctly", () => {
//     // cy.get(".todo-input").type("Todo #1").type("{enter}"); //{enter} click voor de submit
//     //or cleaner syntax
//     cy.get(".todo-input").type("Todo #1{enter}");
//     cy.get(".success").should("be.visible");
//     cy.get(".todo-item").last().should("contain.text", "Todo #1");
//   });
//   it("Should be able to toggle the status of a todo correctly", () => {
//     cy.get(".todo-input").type("Todo #1{enter}");
//     cy.get(".success").should("be.visible");
//     cy.get(".todo-checkbox").check().should("be.checked");
//     cy.get(".todo-checkbox").uncheck().should("not.be.checked");
//   });
//   afterEach(() => {
//     cy.get(".delete-item").click({ multiple: true });
//   });
// });

// USING Cypress Command => support folder
// describe("Todo UI testing", () => {
//   beforeEach(() => {
//     cy.visit("/");
//   });
//   it("Should add a new Todo correctly", () => {
//     // cy.get(".todo-input").type("Todo #1").type("{enter}"); //{enter} click voor de submit
//     //or cleaner syntax
//     cy.addNewTodo("todo 1");
//     cy.get(".todo-item").last().should("contain.text", "todo 1");
//   });
//   it("Should be able to toggle the status of a todo correctly", () => {
//     cy.addNewTodo("todo 2");
//     cy.get(".todo-checkbox").check().should("be.checked");
//     cy.get(".todo-checkbox").uncheck().should("not.be.checked");
//   });
//   it("Should delete Todo correctly", () => {
//     cy.addNewTodo("todo 3");
//     cy.get(".delete-item").click();
//   });
//   it("Should not add an empty Todo", () => {
//     // check commands.js with added if statement
//     cy.addNewTodo("");
//   });
//   afterEach(() => {
//     cy.get("body").then(($element) => {
//       if ($element.find(".delete-item").length > 0) {
//         cy.get(".delete-item").click({ multiple: true });
//       }
//     });
//   });
// });

// Spying POST REQUEST using intercept command and alias command
describe("Todo UI testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should add a new Todo correctly", () => {
    cy.intercept("POST", "http://localhost:8080/todos").as("postRequest");
    cy.addNewTodo("todo 1");
    cy.wait("@postRequest").then((xhr) => {
      expect(xhr.request.body.name).to.eql("todo 1");
    });
    cy.get(".todo-item").last().should("contain.text", "todo 1");
  });
  it("Should be able to toggle the status of a todo correctly", () => {
    cy.addNewTodo("todo 2");
    cy.get(".todo-checkbox").check().should("be.checked");
    cy.get(".todo-checkbox").uncheck().should("not.be.checked");
  });
  it("Should delete Todo correctly", () => {
    cy.addNewTodo("todo 3");
    cy.get(".delete-item").click();
  });
  it("Should not add an empty Todo", () => {
    // check commands.js with added if statement
    cy.addNewTodo("");
  });
  afterEach(() => {
    cy.get("body").then(($element) => {
      if ($element.find(".delete-item").length > 0) {
        cy.get(".delete-item").click({ multiple: true });
      }
    });
  });
});
