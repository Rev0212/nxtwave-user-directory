# User Directory Application
- **Wisdom Peak Analytics Assignment - Nxtwave**
A React application that displays a list of users with search, sort, and pagination functionality. Built with React, Redux Toolkit, and Tailwind CSS.

![Home Page Screenshot Light Mode](Screenshorts\Home-pc-light.png)
![Home Page Screenshot Dark Mode](Screenshorts\Home-pc-dark.png)
![User Details Screenshort](Screenshorts\User-pc.png)
![Home Page Mobile](Screenshorts\Home-phone.png)
![User Details Screenshort](Screenshorts\User-phone.png)

## 🚀 Features

- **User Management**
  - View list of users with detailed information
  - Search users by name
  - Sort users alphabetically (A-Z, Z-A)
  - Pagination support
  - Individual user detail pages

- **UI/UX**
  - Responsive design for mobile and desktop
  - Dark/Light mode toggle
  - Loading states and error handling
  - Clean and modern interface
  - Smooth transitions and animations

- **Technical Features**
  - Redux state management
  - React Router for navigation
  - API integration
  - Modular component structure

## 🛠️ Technologies Used

- React.js 18
- Redux Toolkit
- React Router v6
- Tailwind CSS
- Lucide React Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/rev0212/nxtwave-user-directory.git
cd user-directory
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



## 📁 Project Structure

```
src/
├── components/
│   ├── Home.js
│   └── UserDetail.js
├── store/
│   ├── store.js
│   └── usersSlice.js
├── App.js
└── index.js
```

## 💻 Usage

1. **Home Page**
   - View list of users
   - Use search bar to filter users by name
   - Click sort button to change sorting order
   - Use pagination to navigate through users
   - Toggle theme using the sun/moon icon

2. **User Details**
   - Click on a user card to view detailed information
   - Use "Go Back" button to return to the main list

## 🔍 API Integration

The application uses the JSONPlaceholder API for user data:
- Users endpoint: `https://jsonplaceholder.typicode.com/users`
- Individual user: `https://jsonplaceholder.typicode.com/users/{id}`

## 🎨 Styling

This project uses Tailwind CSS for styling. The main configuration can be found in:
- `tailwind.config.js`
- `src/index.css`

## 🔄 State Management

Redux Toolkit is used for state management with the following features:
- User data fetching and caching
- Search term management
- Sort direction management
- Loading and error states

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🌟 Future Enhancements

- [ ] Add user authentication
- [ ] Implement user data editing
- [ ] Add user creation functionality
- [ ] Implement data export feature
- [ ] Add more filter options

## 👤 Author

Your Name
- GitHub: [@Rev0212](https://github.com/Rev0212)
- LinkedIn: [Revanth A](https://linkedin.com/in/revanthanand)

## 🙏 Acknowledgments
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide Icons](https://lucide.dev/) for the icons