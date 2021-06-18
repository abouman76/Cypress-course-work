/// <reference types="Cypress" />
// ORIGINAL code from tutorial ==> just scroll down.

// Deterministic test with set-up and teardown! Code i added as an extra Exercise!

describe("JWT request", () => {
  before(() => {
    // Cypress.Commands
    cy.signUp();
  });
  after(() => {
    cy.deleteUsers();
    // cy.log("teardown");
    // cy.request("GET", "http://localhost:8080/users").then((response) => {
    //   cy.log("Response", response.body.forEach);
    //   response.body.forEach((user) => {
    //     // cy.log("User", user.email);
    //     cy.request({
    //       method: "DELETE",
    //       url: `http://localhost:8080/users/${user.id}`,
    //     });
    //   });
    // });
  });
  it("SECURED API request", () => {
    cy.get("@token").then((token) => {
      cy.request({
        method: "GET",
        url: "http://localhost:8080/courses",
        auth: {
          bearer: token,
        },
      });
    });
  });
});

describe("request command suite", () => {
  before(() => {
    // cy.log("set up");
    cy.request("POST", "http://localhost:8080/todos", {
      name: "TEST",
      isComplete: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  after(() => {
    // cy.log("kill the server!");
    cy.request("GET", "http://localhost:8080/todos").then((response) => {
      // cy.log("Response", response.body.forEach);
      response.body.forEach((todo) => {
        // cy.log("Todo", todo.id);
        cy.request({
          method: "DELETE",
          url: `http://localhost:8080/todos/${todo.id}`,
        });
      });
    });
  });
  it("Get request", () => {
    cy.visit("http://localhost:3000");
    //cy.log("Hello World");
    cy.request({
      method: "GET",
      url: "http://localhost:8080/todos",
      qs: { id: 1 },
      //with qs you add the parameters that you want to send along with the request
    }).then((response) => {
      cy.log(response.statusText);
      expect(response.body[0].isComplete).to.be.false;
    });
  });
  it("POST request", () => {
    cy.request("POST", "http://localhost:8080/todos", {
      name: "TEST",
      isComplete: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it("PUT request", () => {
    cy.request("PUT", "http://localhost:8080/todos/1", {
      name: "Study Cypress",
      id: 1,
      isComplete: true,
    });
  });
});

// part of the ORIGINAL code from tutorial!

// describe("request command suite", () => {
//   it("Get request", () => {
//     cy.request("http://localhost:8080/todos?id=1").then((response) => {
//       cy.log(response.body);
//       //expect(response.status).to.be.eq(200);
//       //expect(response.duration).to.be.below(20000);
//       expect(response.body[0].isComplete).to.be.false;
//     });
//   });
// });

// KAN ook zo, door een object te maken in the request
// describe("request command suite", () => {
//   it("Get request", () => {
//     cy.request({
//       method: "GET",
//       url: "http://localhost:8080/todos",
//       qs: { id: 1 },
//       //with qs you add the parameters that you want to send along with the request
//     }).then((response) => {
//       cy.log(response.statusText);
//       expect(response.body[0].isComplete).to.be.false;
//     });
//   });
// });

// token via Postman ophalen en toepassing => manier 2
// it("SECURED API request", () => {
//   cy.request({
//     method: "GET",
//     url: "http://localhost:8080/courses",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RTZWN1cmVBUElAbWFpbC5jb20iLCJpYXQiOjE2MjI3MDUxNDQsImV4cCI6MTYyMjcwODc0NCwic3ViIjoiNSJ9.ZgBRHqA69TRqOq_joJ71ESB2oGt_jLF5M_X-qN5NEPM",
//     },
//   });
// });
