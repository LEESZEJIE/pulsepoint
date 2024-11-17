import React from 'react';
import withLazyComponent from './withLazyComponent';

const routes = [
    {
        name: 'home',
        path: '/home',
        element: withLazyComponent(React.lazy(() => import('../pages/home'))),
    },
    {
        name: 'login',
        path: '/login',
        element: withLazyComponent(React.lazy(() => import('../pages/login'))),
    },
    {
        name: 'register',
        path: '/register',
        element: withLazyComponent(React.lazy(() => import('../pages/register'))),
    },
    {
        name: 'doctors',
        path: '/doctors',
        element: withLazyComponent(React.lazy(() => import('../pages/doctors'))),
    },
    {
        name: 'schedule-appointment',
        path: '/schedule-appointment',
        element: withLazyComponent(React.lazy(() => import('../pages/schedule-appointment'))),
    },
    {
        name: 'confirm-appointment',
        path: '/confirm-appointment',
        element: withLazyComponent(React.lazy(() => import('../pages/confirm-appointment'))),
    },
]

export default routes;
