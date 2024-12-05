```
### **README.md**

````markdown
# EmployWise Frontend Assignment (EWFA)

This repository contains the solution for the EmployWise Frontend Assignment. The project is a React application that integrates with the Reqres API to perform basic user management functions such as authentication, user listing, editing, and deleting users.

## **Features**

1. **Authentication**:

   - Login screen for users with validation.
   - Token-based authentication using the Reqres API.

2. **User Management**:

   - Displays a paginated list of users.
   - Users can edit their details (first name, last name, and email).
   - Users can be deleted with appropriate feedback.

3. **UI/UX**:

   - Fully responsive design with modern styling using TailwindCSS.
   - Smooth animations for alerts and transitions.

4. **Custom Alerts**:
   - Pop-up alert notifications at the bottom-left of the screen for error/success messages.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher) [OR]
- [Bun.js](https://bun.sh/) (v0.7 or higher)

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/qbikle/ewfa.git
   cd ewfa
   ```
````

2. Install dependencies using Bun:
   ```bash
   bun install
   ```

---

## **Running the Application**

1. Start the development server:

   ```bash
   bun start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## **Building for Production**

To create a production build:

```bash
bun run build
```

The production files will be available in the `build` folder.

---

## **API Integration**

This application integrates with the [Reqres API](https://reqres.in/) for user management. Below are the key API endpoints used:

- **Login**:

  - Endpoint: `POST /api/login`
  - Body: `{ "email": "eve.holt@reqres.in", "password": "cityslicka" }`

- **List Users**:

  - Endpoint: `GET /api/users?page={page}`

- **Edit User**:

  - Endpoint: `PUT /api/users/{id}`

- **Delete User**:
  - Endpoint: `DELETE /api/users/{id}`

---

## **Folder Structure**

---

## **Assumptions and Considerations**

1. **Authentication**:

   - The login endpoint (`/api/login`) requires the email `eve.holt@reqres.in` and password `cityslicka` for successful login.
   - A token is stored in `localStorage` for session management.

2. **Error Handling**:

   - API errors (e.g., invalid credentials, failed updates) are displayed using the custom alert component.

3. **Pagination**:

   - The user list supports pagination, with buttons for navigating between pages.

4. **UI Framework**:

   - TailwindCSS is used for styling. Custom animations and responsive designs are included.

5. **Animations**:

   - Slide-in and slide-out animations are applied to alerts and transitions.

6. **Deployment**:
   - The application can be hosted on platforms like Vercel or Netlify.

---

## **How to Contribute**

If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## **Contact**

If you have any questions or feedback, feel free to contact me via GitHub or create an issue in this repository.

````

---

### **Steps After Adding the README**

1. Save the file as `README.md` in the root of your repository.
2. Commit and push the file to your GitHub repository:
   ```bash
   git add README.md
   git commit -m "Add README file"
   git push
````

Let me know if you need help with anything else! 🚀
