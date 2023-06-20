Create an API for managing employees with user IDs using Node.js and MongoDB, including CRUD operations. 

1. Set up the project:
   - Create a new directory for your project.
   - Initialize a new Node.js project using `npm init`.
   - Install the necessary dependencies using `npm install express mongoose`.

2. Create an Express server:
   - Create an `index.js` file in the project directory.
   - Import the required dependencies (`express` and `mongoose`).
   - Set up the Express app and connect to the MongoDB database.

3. Define a model and schema for the employees:
   - Create a new directory called `models`.
   - In the `models` directory, create a file `user.js` to define the model and schema for employees.

4. Implement the CRUD routes:
   - Create a new directory called `routes`.
   - In the `routes` directory, create a file `users.js` to define the API routes for CRUD operations.
1. Create an employee
2. Update an employee
3. Read the data of an employee 
4. Delete an employee

5. Mount the routes in the main app:
   - In the `index.js` file, require and mount the routes defined in `routes/users.js`.
   - http://localhost:8000/employees?page=1&limit=1 this is for pagination which have 1 result on one page.
   - http://localhost:8000/all-emp it gives all employee data.
   - http://localhost:8000/update/:id it updates employee data taking id of employee whichi is generated in mongoose.
   - http://localhost:8000/delete/:id it delete user from data taking of it's id of mongoose.
   - http://localhost:8000/newEmp it takes data of new user.
   - Data should be{userId, name, email, password, DOB, DOJ, phone}.

To add pagination
we retrieve the `page` and `limit` values from the query parameters. If these parameters are not provided, we default to `page=1` and `limit=10`. 

We then calculate the total number of employees and the total number of pages based on the limit. Next, we determine the `skip` value to skip the appropriate number of employees based on the current page. Finally, we retrieve the employees using the `skip` and `limit` values and return the paginated result along with the current page and total pages.

This allows you to retrieve employees with pagination by specifying the desired page and limit in the query parameters.
