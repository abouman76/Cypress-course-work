// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("addNewTodo", (todo) => {
  cy.get(".todo-input").type(todo + "{enter}");
  if (todo) {
    cy.get(".success").should("be.visible");
  } else {
    cy.get(".error").should("be.visible");
  }
});

Cypress.Commands.add("addDummyTodos", () => {
  const dummyTodos = [
    {
      name: "Learn Cypress",
      isComplete: false,
    },
    {
      name: "Build Framework",
      isComplete: true,
    },
    {
      name: "Drink Beer",
      isComplete: false,
    },
    {
      name: "Drink water",
      isComplete: true,
    },
  ];
  dummyTodos.forEach((todo) => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/todos", //backend server
      body: todo,
      // body: {
      //   name: todo.name,
      //   isComplete: todo.isComplete,
      // },
    });
  });
});

Cypress.Commands.add("signUp", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:8080/signup",
    body: {
      email: "test@mail.com",
      password: "Ab123456",
      firstname: "Olivier",
      lastname: "Monge",
      age: 32,
    },
  }).then((response) => {
    // cy.log("resp:", response.body.accessToken);
    cy.wrap(response.body.accessToken).as("token");
  });
});

Cypress.Commands.add("deleteUsers", () => {
  cy.request("GET", "http://localhost:8080/users").then((response) => {
    cy.log("Response", response.body.forEach);
    response.body.forEach((user) => {
      // cy.log("User", user.email);
      cy.request({
        method: "DELETE",
        url: `http://localhost:8080/users/${user.id}`,
      });
    });
  });
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
