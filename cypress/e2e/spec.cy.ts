describe('Jobs module', () => {
  beforeEach(() => {
    cy.visit('/jobs'),
      cy
        .intercept(
          {
            method: 'GET', // Route all GET requests
            url: `http://127.0.0.1:3000/jobs` // that have a URL that matches '/users/*'
          },
          [{ title: 'Test Job' }] // and force the response to be: []
        )
        .as('getJobs') // and assign an alias
  })

  it('displays the list of jobs', () => {
    cy.get('h1').should('have.text', 'Jobs')
  })

  it('creates a job', () => {
    cy.contains('Create Job').click()
    cy.get('h2').should('contains.text', 'Create job ')
    cy.get('input[formControlName=title]').type('Test Job')
    cy.get('input[formControlName=number]').type('123')
    cy.get('input[formControlName=numberOfOpenings]').type('2')
    cy.get(
      'app-datepicker-range > .row > .col-12:first-child .icon-calendar'
    ).click()
    cy.get('.custom-day').contains('1').click()
    cy.get('.custom-day').contains('15').click()
    cy.get('input[formControlName=isExperienceRequired]').click()
    cy.get('button.btn-dark').click()
    cy.wait(['@getJobs'])
    cy.contains('Test Job')
  })

  it('edits a job', () => {
    cy.get('tbody tr:first-child .icon-pencil').click()
    cy.get('h2').should('contains.text', 'Edit Job')
  })

  it('displays job details', () => {
    cy.get('tbody tr:first-child .icon-eye').click()
    cy.get('app-job-detail .col-12.col-md-9:nth-child(2)').should(
      'have.text',
      Cypress.$('tbody tr:first-child td:first-child').text()
    )
  })
})
