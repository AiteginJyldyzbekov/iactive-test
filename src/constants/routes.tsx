import HomePage from "../pages/homePage/HomePage";
import MessageDetail from "../pages/messageDetail.tsx/MessageDetail";

export const messageRoutes = [
  {
    title: 'Home page',
    path: '/',
    Component: HomePage,
  },
  {
    title: 'Message Detail Page',
    path: '/message/:id',
    Component: MessageDetail,
  },
]