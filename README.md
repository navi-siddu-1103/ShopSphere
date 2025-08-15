# ShopSphere E-commerce Platform

Welcome to ShopSphere, a modern, feature-rich e-commerce application built with Next.js and Firebase. This project serves as a comprehensive example of a full-stack web application, complete with product browsing, a shopping cart, user authentication, and AI-powered recommendations.

## ✨ Key Features

-   **Product Browsing & Filtering**: Browse a large catalog of products by category. Sort and filter products by price, rating, and other criteria.
-   **Product Details**: View detailed information for each product, including multiple images, descriptions, pricing, and customer reviews.
-   **Shopping Cart**: A persistent shopping cart that syncs between sessions and across devices for authenticated users.
-   **User Authentication**: Secure user sign-up and login with email/password and Google OAuth, powered by Firebase Authentication.
-   **Order History**: Registered users can view their past orders.
-   **AI Recommendations**: Personalized product suggestions based on a user's viewing history, powered by Genkit.
-   **Voice Search**: Search for products using your voice.
-   **Responsive Design**: A beautiful, mobile-first design that looks great on all devices.
-   **Dark Mode**: Switch between light and dark themes.

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore, Authentication)
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   `npm` or `yarn` package manager

### Installation & Setup

1.  **Clone the repository** (or download the source code ZIP).
    ```sh
    git clone https://your-repository-url.com/shopsphere.git
    cd shopsphere
    ```
2.  **Install NPM packages**. This will download all the necessary project dependencies.
    ```sh
    npm install
    ```
3.  **Set up Firebase**. You will need to create a Firebase project and get your configuration keys.
    -   Go to the [Firebase Console](https://console.firebase.google.com/).
    -   Create a new project.
    -   In your project settings, create a new Web App.
    -   Copy the `firebaseConfig` object.
4.  **Configure Environment Variables**.
    -   Create a new file named `.env.local` in the root of your project.
    -   Add your Firebase configuration keys to this file:
        ```env
        NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
        ```
5.  **Run the development server**.
    ```sh
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📁 Folder Structure

Here's an overview of the key directories in the project:

-   **/src/app/**: Contains all the application routes, pages, and layouts, following the Next.js App Router structure.
-   **/src/components/**: Shared React components used throughout the application (e.g., `ProductCard`, `Header`, `Footer`).
-   **/src/actions/**: Server-side functions (Server Actions) for handling form submissions and data mutations (e.g., creating orders, updating the cart).
-   **/src/ai/**: Genkit flows and configuration for AI-powered features.
-   **/src/context/**: React context providers for managing global state (e.g., cart, user session).
-   **/src/hooks/**: Custom React hooks.
-   **/src/lib/**: Utility functions, Firebase configuration, and product data.
-   **/public/**: Static assets like images and fonts.

---

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/studio).

