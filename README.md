# Socia

- a dummy social networking website.

## Project Submission Details:


* **Names of Project Members/Contributors:**

	* [Rohit Kaushal](https://github.com/RohitKaushal7) (185037) 
	* [Prateek Bharat Sharma](https://github.com/prateeksharma21) (185019)
	* [Vishal Shrivastava](https://github.com/vishalshrivastava16) (185023)
	* [Nishit Attrey](https://github.com/NishitAttrey) (185028)

* **Course:**  CSD-327 Software Engineering LAB
* **Date:** May 6th, 2021
* **Submitted to:** Dr. Dharmendra Prasad Mahto

## Getting the project Up and Running [dev_mode] ( Installation )

- **Database** - PostgreSQL
  - install PostgreSQL if not installed. [See Installation Instructions](https://www.postgresql.org/download/linux/ubuntu/)
  - create database named `socia`
    ```bash
    createdb socia
    ```
- **Backend/API Server**

  > **Note** - project runs on nodejs. if you don't have installed please install Nodejs first.
  >
  > ```bash
  > sudo apt install nodejs
  > ```
  >
  > Windows : [Download from Official Site](https://nodejs.org/en/download/)

  - switch to `backend/` directory
  - install dependencies
    ```bash
    npm install
    ```
  - Connect Database
    - create a file named `.env` with this content ( replace `db_username, db_password` with your database username, password )
    ```
    DATABASE_URL="postgresql://db_username:db_password@localhost:5432/socia"
    JWT_SECRET="mysupersecret"
    ```
  - start backend server

    ```bash
    npm start
    ```

- **Frontend Server**
  - switch to `frontend/` directory
  - install dependencies
    ```bash
    npm install
    ```
  - start frontend server
    ```bash
    npm start
    ```
  - project should be running at http://localhost:3000
