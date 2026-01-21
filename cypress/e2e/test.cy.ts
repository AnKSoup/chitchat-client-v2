//Data :
const user1 = {
  name: 'John',
  email: 'john@jhon.jhon',
  password: 'John123!',
}
const user2 = {
  name: 'Jean',
  email: 'jean@jean.jean',
  password: 'John123!',
}

function SignIn(name: string, email: string, password: string) {
  cy.get('input[placeholder="Username"]').type(name)
  cy.get('input[placeholder="Email"]').type(email)
  cy.get('input[placeholder="Password"]').type(password)
}
function LogIn(email: string, password: string) {
  cy.get('input[placeholder="Email"]').type(email)
  cy.get('input[placeholder="Password"]').type(password)
}

describe('User 1 : Signs in / Edits / Leaves', () => {
  it('passes', () => {
    // ### Step 1 : signs in user 1 ###

    //Goes to home
    cy.visit('http://localhost:5173')
    //Clicks Sign in button
    cy.contains('button', 'Join').click()

    //Signs in
    SignIn(user1.name, user1.email, user1.password)

    //Prepares cypher to check for fail
    cy.intercept('POST', 'http://localhost:3334/user').as('signIn')

    //Signs user in
    cy.get('input[type="submit"]').click()

    cy.wait('@signIn').its('response.statusCode').should('eq', 201)

    //### Step 2 : user 1 edits their blog ###
    //Needs to wait for the content to load
    cy.intercept('GET', 'http://localhost:3334/blog/1').as('blogContent')

    //Goes to blog
    cy.get('img[alt="blog"]').click()

    cy.wait('@blogContent')

    //Clicks edit
    cy.get('img[alt="settings"]').click()

    //Needs to wait for the comment to load or else it'll throw an exception upon instantly disconnecting which fails the test
    cy.intercept('POST', 'http://localhost:3334/comment/of/1').as('blogComment')

    //Fills blog
    cy.get('textarea[placeholder="Write your thoughts here..."]')
      .clear()
      .type('<h1 style="color:red">HELLO CYPRESS!!!!</h1>')
    //Edits
    cy.contains('button', 'Change').click()

    cy.wait('@blogComment')

    //### Step 3 : user 1 Logs out ###
    cy.intercept('POST', 'http://localhost:3334/user/logout').as('logout')
    //Logs out
    cy.get('img[alt="log_out"]').click()

    cy.wait('@logout')
    //Is home
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })

    //Saves local storage
    cy.saveLocalStorage()
  })
})

describe("User 2 : Signs in / Starts conv with user 1 / comments User 1's blog  / Leaves", () => {
  it('passes', () => {
    //Restore storage
    cy.restoreLocalStorage()

    // ### Step 1 : signs in user 2 ###

    //Goes to home
    cy.visit('http://localhost:5173')
    //Clicks Sign in button
    cy.contains('button', 'Join').click()

    //Signs in
    SignIn(user2.name, user2.email, user2.password)

    //Prepares cypher to check for fail
    cy.intercept('POST', 'http://localhost:3334/user').as('signIn')

    //Signs user in
    cy.get('input[type="submit"]').click()

    cy.wait('@signIn').its('response.statusCode').should('eq', 201)

    //### Step 2 : user 2 starts a conv with user 1 ###
    cy.intercept('POST', 'http://localhost:3334/conversation').as('newConv')

    cy.get('img[alt="create_conversation"]').click()
    //Inputs name
    cy.get('input[placeholder="Name"]').type('My conversation')
    cy.get('input[type="submit"]').click()

    cy.wait('@newConv')

    cy.get('img[alt="add_user"]').click()

    cy.intercept('GET', 'http://localhost:3334/user/search/' + user1.name).as('searchUser1')
    //Inputs name
    cy.get('input[placeholder="Username"]').type(user1.name)
    cy.contains('button', 'Search').click()

    cy.wait('@searchUser1')
    cy.contains('p', user1.name).click()

    //Write message
    cy.get('textarea[placeholder="Write something..."]').type('message!!')
    cy.contains('button', 'SEND').click()

    //### Step 3 : Comment user 1's blog ###
    cy.contains('p', user1.name).click()

    cy.get('textarea[placeholder="Comment something..."]').type('This is my comment!!')
    cy.contains('button', 'SEND').click()

    //### Step 4 : leave ###
    cy.intercept('POST', 'http://localhost:3334/user/logout').as('logout')
    //Logs out
    cy.get('img[alt="log_out"]').click()

    cy.wait('@logout')
    //Is home
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })

    //Saves local storage
    cy.saveLocalStorage()
  })
})

// HOW TO KEEP MY LOCAL STORAGE????????

describe('User 1 : Logs in / Responds to Conv / Responds to Com', () => {
  it('passes', () => {
    //Restore storage
    cy.restoreLocalStorage()

    // ### Step 1 : Logs in user 1 ###

    //Goes to home
    cy.visit('http://localhost:5173')
    //Clicks Sign in button
    cy.contains('button', 'Start').click()

    //Prepares to intercept the log in response
    cy.intercept('POST', 'http://localhost:3334/user/login').as('login')

    //Logs in
    LogIn(user1.email, user1.password)

    cy.get('input[type="submit"]').click()

    //Else fails
    cy.wait('@login').its('response.statusCode').should('eq', 200)

    //### Step 2 : user responds to the conversation ###
    cy.contains('p', 'My conversation').click()

    cy.intercept('POST', 'http://localhost:3334/message/1').as('messageSent')

    //Write message
    cy.get('textarea[placeholder="Write something..."]').type('message 2!!')
    cy.contains('button', 'SEND').click()

    cy.wait('@messageSent').its('response.statusCode').should('eq', 201)

    //Needs to wait for the content to load
    cy.intercept('POST', 'http://localhost:3334/comment/of/1').as('blogComment')

    //Goes to blog
    cy.get('img[alt="blog"]').click()

    cy.wait('@blogComment')

    //Select Comment
    cy.contains('p', 'This is my comment!!').click()

    cy.get('textarea[placeholder="Comment something..."]').type('This is my response!!')
    cy.contains('button', 'SEND').click()

    //### Step 4 : user 1 Logs out ###
    cy.intercept('POST', 'http://localhost:3334/user/logout').as('logout')
    //Logs out
    cy.get('img[alt="log_out"]').click()

    cy.wait('@logout')
    //Is home
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })

    // clears local storage
    cy.clearLocalStorageSnapshot()
  })
})
