<h1 align="center">Markdown Notes</h1>

<p align="center">A simple markdown editor with Firebase Firestore for note persistence and Firebase Auth for authentication.</p>

<p align="center">
    <a href="#running">Running Locally</a> •
    <a href="#used-techs">Technologies Used</a> •
    <a href="#improvements">Potential Improvements</a> •
    <a href="#author">Author</a>
</p>

---

<h3 id="running">Running Locally</h3>

To explore Markdown Notes locally, follow these steps:

1. **Clone this repository and Install the dependencies**

```bash
$ git clone git@github.com:jspereiramoura/markdown-editor-react-firebase.git
$ cd markdown-editor-react-firebase
$ pnpm install
```

2. **Configure and Start firebase emulators**

> [!TIP]
> Remember that you can use the [firebase cli documentation](https://firebase.google.com/docs/emulator-suite/install_and_configure?hl=pt-br) at this step.

```
npx firebase login
npx firebase init
npx firebase emulators:start
```

3. **Run the project**

```bash
$ pnpm dev
```

---

<h3 id="used-techs">Technologies Used</h3>

This project is built with the following technologies:

- **Firebase**:
  - [Firestore](https://firebase.google.com/products/firestore) for note persistence
  - [Auth](https://firebase.google.com/products/auth) for user authentication
- **Frontend**:
  - [React](https://reactjs.org/) for the UI
  - [Tailwind CSS](https://tailwindcss.com/) for styling

---

<h3 id="improvements">Potential Improvements</h3>

Some potential improvements for the project include:

- Enhancing responsiveness for smaller screens
- Implementing a live preview feature
- Implementing a command palette triggered by `/`
- Displaying error messages for login and sign up issues
- Handling and showing general Firestore errors

---

<div align="center">
<h3 id="author">Author</h3>

<strong>José Luiz de Moura Pereira - Front-end Developer</strong>

<div>
  <a href="https://www.linkedin.com/in/jspereiramoura" target="_blank">
    <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="32" alt="LinkedIn" />
  </a>
  <a href="mailto:joseluiz.zp@gmail.com">
    <img src="https://img.shields.io/static/v1?message=Gmail&logo=gmail&label=&color=D14836&logoColor=white&labelColor=&style=for-the-badge" height="32" alt="Gmail" />
  </a>
  <a href="https://discordapp.com/users/jspereiramoura" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Discord&logo=discord&label=&color=7289DA&logoColor=white&labelColor=&style=for-the-badge" height="32" alt="Discord" />
  </a>
</div>

</div>