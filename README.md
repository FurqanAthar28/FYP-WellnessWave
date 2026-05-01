<img width="637" height="507" alt="image" src="https://github.com/user-attachments/assets/baf49567-fe0e-468c-b6eb-1d4a01a0ceb1" />

# 🌿 WellnessWave — Mental Health Platform

WellnessWave is a full-stack mental health platform built as a Final Year Project. It connects students, faculty, and staff with certified counsellors through appointment booking, real-time video sessions, and mental health resources — all within a secure, role-based web application.

---

## ✨ Features

### 👤 Multi-Role Authentication
- **Admin** — Manage users, approve/reject registrations, view all platform activity
- **Counsellor** — Manage appointments, conduct video sessions, post exercises and surveys
- **Student / Faculty / Staff** — Book appointments, join video rooms, track mental health indicators

### 📅 Appointment Booking
- Users browse available counsellors and book appointments
- Counsellors manage their schedule and accept/reject bookings
- Real-time status updates via Redux state management

### 🎥 Video Rooms (WebRTC)
- Live video sessions between users and counsellors
- Powered by **ZegoCloud UIKit** for WebRTC integration
- Meeting lounge with room management

### 💬 Real-Time Chat
- Chat functionality between users and counsellors
- Integrated via ZegoCloud ZIMKit

### 📊 Mental Health Indicators
- Users can track and submit mental health indicators
- Counsellors can review submitted data

### 🛡️ Protected Routes
- Role-based route protection
- JWT-based authentication with token decoding
- Separate permission layers for Admin and Counsellor roles

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, React Router v6 |
| State Management | Redux + Redux Thunk |
| Styling | Tailwind CSS, Bootstrap 5, Ant Design |
| Video/Chat | ZegoCloud UIKit + ZIMKit (WebRTC) |
| HTTP Client | Axios |
| Auth | JWT (jwt-decode) |
| Notifications | React Toastify |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/              # Admin modals (Add Counsellor)
│   ├── common/             # Shared Navbar, Sidebar, Toast
│   ├── counsellor/         # Counsellor posts, modals
│   └── signup/             # Role-specific signup forms
│       ├── counsellor/
│       ├── faculty/
│       ├── staff/
│       └── student/
├── pages/
│   ├── admin/              # Dashboard, User list, User details
│   ├── auth/               # Login, Signup
│   ├── chat/               # Chat page
│   ├── counsellor/         # Counsellor home, appointments, posts
│   ├── room/               # Video room, Meeting lounge
│   └── user/               # Home, Appointment booking, Indicators, Profile
├── redux/
│   ├── actions/            # Admin, Appointment, Auth, Post actions
│   ├── reducers/           # All reducers + root reducer
│   └── store/              # Redux store configuration
└── routes/
    ├── PrivateRoute.js     # Auth protection
    ├── Permissions.js      # Admin route guard
    └── CounsellorPermission.js  # Counsellor route guard
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/FurqanAthar28/WellnessWave.git
cd WellnessWave
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create a `.env` file in the root:
```
REACT_APP_API_URL=your_backend_api_url
REACT_APP_ZEGO_APP_ID=your_zegocloud_app_id
REACT_APP_ZEGO_SERVER_SECRET=your_zegocloud_server_secret
```

### 4. Start the development server
```bash
npm start
```

Visit `http://localhost:3000`

---

## 🔐 User Roles

| Role | Access |
|------|--------|
| Admin | Full platform management, user approval |
| Counsellor | Appointments, video sessions, posts |
| Student | Booking, video rooms, indicators |
| Faculty | Booking, video rooms, indicators |
| Staff | Booking, video rooms, indicators |

---

## 📝 Note

This is the **frontend** of the WellnessWave platform. The backend API (Django REST Framework) handles authentication, appointment management, and data storage.

---

## 👨‍💻 Author

**Furqan Athar**
- GitHub: https://github.com/FurqanAthar28
- LinkedIn: https://www.linkedin.com/in/furqan-athar-a0090a207
