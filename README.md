# School Management Application

A web-based school management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Tailwind CSS for styling. This application allows managing classes, teachers, and students in a school and provides analytics functionalities.

## Video:

https://github.com/tanisha0605/School-Management-System/assets/144723509/48a8f0b8-7525-45e4-b09d-785775cd5dee

## Features

- **Data Management**: Manages three core models:
  - **Class**: Stores details like class name, year, teacher, student fees, and student list.
  - **Teacher**: Teacher information including name, gender, D.O.B., contact details, salary, assigned class, etc.
  - **Student**: Student information including name, gender, D.O.B., contact details, fees paid, and class, etc.
- **CRUD Operations**: Supports CRUD operations for all the above models.
- **Reusable React Components**: Develops reusable React components for forms and tables.
- **Dynamic Forms**: Forms dynamically render input fields based on the selected model (Class, Teacher, Student).
- **Class Limit**: Adds a limit to the number of students in each class.
- **Analytics Pages**:
  - Clicking on a class in the class management page opens a class analytics page showing all details of the class like name, year, teachers, students list, etc. Also, includes a graph showing the number of male and female students in that class.
  - An analytics page showing the expenses spent on teachers' salaries and income generated from paid students' fees. Provides a toggle to switch between monthly/yearly views and options to select the month and year for monthly view and year for yearly view.

## Bonus Features

- **Pagination,Filtering and Sorting**: Implements pagination,filtering and sorting for tables.
- **Form Validation**: Includes form validation to ensure data integrity and accuracy.

## Installation

1. Clone the repository:
   ```bash
   https://github.com/tanisha0605/School-Management-System.git
   ```
2.Navigate to the project directory:
  ```bash
  cd school-management-application
  ```
3.Install dependencies:
  ```bash
  npm install
  ```
4.Set up MongoDB:
Install MongoDB locally or use a cloud-based MongoDB service.
Configure MongoDB connection URI in the .env file.

## Usage
1.Start the server:
```bash
npm start
```
2.Go to client directory and run the command:
```bash
npm run dev
```
3.Open the application in your browser:
```bash
http://localhost:5173/
```

   
