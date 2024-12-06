# Chat Application

This project is a real-time chat application built using modern web technologies. It demonstrates a well-rounded application of frontend and backend development skills, focusing on real-time communication, user interface design, and performance optimization.

---

## Features

- **Real-Time Communication**: Users can send and receive messages in real-time using WebSockets powered by `Socket.IO`.
- **User-Friendly Interface**: A responsive and visually appealing user interface built with `Next.js` and `Tailwind CSS`.
- **Room-Based Chat**: Users can join specific chat rooms and interact with other users in the same room.
- **State Management**: Efficient management of application state using `React` hooks.
- **Custom Hooks**: Implementation of reusable custom hooks for functionalities like debouncing.
- **Dynamic Modals**: Modal windows for displaying additional information, such as user or message details.
- **Responsive Design**: Designed to work seamlessly on various devices, from mobile to desktop.

---

## Technologies Used

### Frontend

- **Next.js**: For building the client-side application with server-side rendering and routing.
- **React.js**: Core library for building user interfaces.
- **Tailwind CSS**: For rapid and consistent styling across the application.
- **Socket.IO**: For establishing and managing real-time WebSocket connections.

### Backend

- **Socket.IO Server**: For handling WebSocket connections and real-time events.

---

## Skills Demonstrated

### 1. Frontend Development

- **Component-Based Architecture**:
  - Encapsulation of UI and logic into reusable components such as `Chat`, `Message`, and `Product`.
- **Custom Hooks**:
  - Implementation of a custom debounce hook (`useDebounce`) for optimizing input handling.
- **State Management**:
  - Effective use of `useState` and `useEffect` hooks to manage local and global states.

### 2. Backend Integration

- **WebSocket Communication**:
  - Integration with `Socket.IO` for real-time messaging and user updates.
- **Dynamic Data Handling**:
  - Querying user-specific and room-specific data dynamically.

### 3. UI/UX Design

- **Responsive Layouts**:
  - Ensured the interface is accessible and visually consistent across devices.
- **Modular Styling**:
  - Used `Tailwind CSS` for clean and maintainable styling.

### 4. Error Handling

- Graceful handling of loading states and fallback messages for incomplete data (e.g., no user image).

### 5. File and Media Management

- Efficient management of user-provided images and dynamic resource loading.

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository/chat-application.git
2. **Navigate to the Project Directory
   ```bash
   cd chat-application
3. **Install Dependencies
   ```bash
   npm install
4. **Start the Application
  - Navigate to the server directory (if separate) and run.
   ```bash
   node server.js
  - Run
   ```bash
    npm run dev
6. **Access the Application
Access the Application: Open your browser and go to http://localhost:3000.
   
