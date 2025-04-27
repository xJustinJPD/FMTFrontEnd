import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/index.css';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './components/ui/sidebar';



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
        <AuthProvider>
            <SidebarProvider>
                <App />
            </SidebarProvider>
        </AuthProvider>
    </React.StrictMode>
);