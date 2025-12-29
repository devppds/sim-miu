'use client';

import React from 'react';
import { useAuth } from '@/lib/AuthContext';

export default function Header() {
    const { user } = useAuth();

    return (
        <header>
            <div className="header-search">
                {/* Placeholder for header search or title if needed, currently empty in CSS but useful for spacing */}
            </div>

            <div className="header-actions">
                <button className="btn-vibrant btn-vibrant-blue">
                    <i className="fas fa-bell"></i>
                </button>

                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">{user?.fullname || 'User'}</span>
                        <span className="user-role">{user?.role || 'Guest'}</span>
                    </div>
                    <div className="user-avatar">
                        {/* Using a placeholder avatar */}
                        <img src="https://ui-avatars.com/api/?name=Admin+Pusat&background=random" alt="User" />
                    </div>
                </div>
            </div>
        </header>
    );
}
