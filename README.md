# Marte ERP — Code Showcase

This repository contains **selected React + TypeScript code snippets** from the Marte ERP project.  
The purpose of this showcase is to demonstrate **real-world React patterns, state management, UI components, and API handling**, suitable for interviews or portfolio presentation.  

> ⚠️ This is a **code showcase only**. There is no `node_modules` or fully running application. The files are self-contained examples to illustrate design, architecture, and problem-solving skills.

---

## 📁 File Overview

### 1. `useDebouncedCallback.ts`
A custom React hook that provides a **debounced callback**.  
- Demonstrates use of `useRef` and `useCallback` for performance optimization.  
- Can be used to debounce user input in forms or search fields.  

### 2. `useItemForm.ts`
A **custom hook** for handling item forms in the ERP system.  
- Manages form state, image uploads, and validation logic.  
- Shows nested state updates, async validation (like checking item code availability), and integration with Redux notifications.  

### 3. `RequireAuth.tsx`
A **route guard component** for React Router.  
- Ensures that protected routes are only accessible to authenticated users.  
- Demonstrates async authentication with Redux, loading state handling, and redirect logic.  

### 4. `apiHelpers.ts`
Utilities for API authentication and global error handling.  
- `getAuthData`: Adds JWT token to API request headers.  
- `apiErrorHandler`: Handles `401 Unauthorized` responses with Redux notifications and automatic logout.  
- Demonstrates centralized error handling, dynamic imports, and defensive programming.  

### 5. `apiClient.ts`
Custom **Axios client** for ERP API calls.  
- Uses `apiErrorHandler` globally via Axios interceptors.  
- Illustrates clean API architecture and reusability.  

### 6. `Sidebar.tsx`
Dynamic sidebar component for the ERP UI.  
- Renders menu items based on **user permissions**.  
- Supports **collapsible layout** and navigation with React Router.  
- Demonstrates conditional rendering, use of Redux state, and modular design.  

### 7. `Icon.tsx`
Reusable icon component using **SVG imports and enums**.  
- Dynamically renders icons based on type-safe enum (`IconT`).  
- Provides fallback for missing icons.  
- Shows reusable UI design, TypeScript best practices, and clean mapping.  

---

## 🔹 Key Skills Demonstrated

- **React & TypeScript:** Hooks, custom hooks, component design, state management.  
- **API Handling:** Axios, JWT token auth, centralized error handling, async validation.  
- **UI Patterns:** Reusable components, conditional rendering, permission-based navigation.  
- **Best Practices:** Type safety, modular code, fallback handling, code readability.  

---

## 📌 Usage

These files are intended for **code review and interview purposes**.  

To explore the logic:  
1. Open any `.ts` or `.tsx` file to view the code.  
2. You can copy the files into your own React/TypeScript project to run them if desired.  
3. All external dependencies (like `redux`, `react-router-dom`) are referenced but **mocking is possible** for standalone exploration.  

---

## 💡 Notes

- Georgian labels have been translated to English for clarity.  
- This showcase focuses on **demonstrating the skills**, not a running application.  
- Each file highlights **real-world patterns** used in ERP applications.  
