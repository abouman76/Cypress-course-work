/// <reference types="Cypress" />

// 1. Build the suite!
// 2. We have an API to ADD a TODO.
// 3. Build the first testcase to add a todd using api, with cy.request, method "POST"
// 4. .then() expact the response needs to be status 201 (created)
// 5. expect the element to contain the value of "name";
// 6. add a variable for the ID => let id;
// 7. Extract the ID from the body and check the console for the id that is added
// GET testcase:
// 8. Build a second test case to GET the specific Todo correctly cy.request "GET"
// 9. .then() expact the response to be status 200
// 10. expact the element to contain the value of "name";
// UPDATE testcase:
// 11. Build the third testcase to UPDATE the status of the Todo
// 12. cy.request met PUT, url and body
// 13. add the body in the cy.request with the key value's and change isComplete: true
// 14. .then expact the response of the body isComplete => needs to be eql to true
// DELETE testcase:
// 15. Build the fourth testcase to DELETE the todo correctly
// 16. cy.request met DELETE and url
// 17. .then() expect the response status 200

describe("Test all the Todos using the API", () => {
  let id;
  it("Should add a Todo correctly using the API", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/todos", //backend server
      body: {
        name: "Add Todo",
        isComplete: false,
      },
    }).then((response) => {
      id = response.body.id;
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eql("Add Todo");
    });
  });
  it('Should get a specific Todo "by ID" correctly', () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8080/todos/" + id,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("Add Todo");
    });
  });
  it("Should update the status of a Todo correctly", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:8080/todos/" + id,
      body: {
        name: "Add Todo",
        isComplete: true,
      },
    }).then((response) => {
      expect(response.body.isComplete).to.eql(true);
    });
  });
  it("Should delete a Todo", () => {
    cy.request({
      method: "DELETE",
      url: "http://localhost:8080/todos/" + id,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
