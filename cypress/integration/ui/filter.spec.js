/// <reference types="Cypress" />

// Many testcase both commented en un-commented

// 1. Create / Add 5 Todos with different status using UI(84)
// 2. Create them by using UI, API or Moch the response/server to create the data
// 3. Use UI and API in this test case
// 4. Need to create DATA before you start the test with before hook
// 5. Add cy.visit with url to check
// 6. Create an array with the 5 todos and use forEach() to loop over these.
// 7. Add the Cypress Commands.

// test by using UI (not prefered!)
describe("filter functionality test cases using UI", () => {
  before(() => {
    cy.visit("/");
    const todosExample = ["Todo1", "Todo2", "Todo3", "Todo4", "Todo5"].forEach(
      (todo) => {
        cy.addNewTodo(todo);
      }
    );
    cy.get(".todo-checkbox").first().check().should("be.checked");
    cy.get(".todo-checkbox").last().check().should("be.checked");
  });
  it("dummy test", () => {});
  after(() => {
    cy.get("body").then(($element) => {
      if ($element.find(".delete-item").length > 0) {
        cy.get(".delete-item").click({ multiple: true });
      }
    });
  });
});

// TEST by adding the data using the API (create 4 todos as an example)
// 1. cy.request();
// 2. create a new Cypress Command which will use the API
// 3. Create an array with objects with all the todos in the cypress commands (addDummyTodos)
// 4. Because this is a POST request the object needs to contain: {"name": "", "isComplete": ""}
// 5. In commands.js add the variablename.forEach() and add all the cy.request keys that are needed.
// 6. Add the Cypress.Command name in the hook
// 7. Add the cy.vist

// describe("filter functionality test cases using data from API", () => {
//   before(() => {
//     cy.addDummyTodos();
//     cy.visit("/");
//   });
//   it("Should filter the completed Todos correctly", () => {
//     cy.contains("Complete").click();
//     cy.url().should("contain", "/complete");
//     cy.get(".todo-checkbox").each((eachTodo) => {
//       cy.wrap(eachTodo).should("be.checked");
//     });
//   });

//   it("Should filter the active Todos correctly", () => {
//     cy.contains("Active").click();
//     cy.url().should("contain", "/active");
//     cy.get(".todo-checkbox").each((eachTodo) => {
//       cy.wrap(eachTodo).should("not.be.checked");
//     });
//   });

//   after(() => {
//     cy.get("body").then(($element) => {
//       if ($element.find(".delete-item").length > 0) {
//         cy.get(".delete-item").click({ multiple: true });
//       }
//     });
//   });
// });

// cy.intercept command practice => Steps and explanation
// 1. make cy.intercept command
// 2. Add the route matcher, like method and url
// 3. Add the route handler and add what you want Cypress to do. In this case you want to send back the data of the Todo's by adding the Body and the array of todos
// 4. add cy.visit() with the website you are testing

// this above steps mean that when the application code finds the endpoint or the API request, this request will not go to the real server.
// It will go to the Cypress server and Cypress will return all the data that is mentioned in the body.

// the code example has also hardcoded code in _route handler_ which is not best practice.
// Should use fixtures. Check fixture folder and files.

describe.only("filter functionality test cases using data from API", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:8080/todos",
      },
      {
        fixture: "todos",
        // body: [
        //   {
        //     name: "Learn Cypress",
        //     isComplete: false,
        //   },
        //   {
        //     name: "Build Framework",
        //     isComplete: true,
        //   },
        //   {
        //     name: "Drink Beer",
        //     isComplete: false,
        //   },
        //   {
        //     name: "Drink water",
        //     isComplete: true,
        //   },
        //],
      }
    );
    cy.visit("/");
  });
  it("Should filter the completed Todos correctly", () => {
    // cy.contains("Complete").click();
    // cy.url().should("contain", "/complete");
    // cy.get(".todo-checkbox").each((eachTodo) => {
    //   cy.wrap(eachTodo).should("be.checked");
    // });
  });

  it("Should filter the active Todos correctly", () => {
    // cy.contains("Active").click();
    // cy.url().should("contain", "/active");
    // cy.get(".todo-checkbox").each((eachTodo) => {
    //   cy.wrap(eachTodo).should("not.be.checked");
    // });
  });
});
