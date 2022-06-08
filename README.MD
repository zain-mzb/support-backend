## Turff Backend Codding Challenge

#### Backend (Node + Express)

#### MySQL Tables = 3
##### Users
USERID(PK), Name

##### Comments 
ID(PK), USERID(FK), ticket_id, Text

##### Tickets
ID(PK), USERID(FK), Title, Description

#####  Routes
localhost:5000/api/v1/users (POST)
localhost:5000/api/v1/tickets (GET)
localhost:5000/api/v1/tickets/full (GET)
localhost:5000/api/v1/tickets/add-comment (POST)
localhost:5000/api/v1/tickets/:id (PUT)


#####  Security

XSS
Rate Limiter
Helmet


