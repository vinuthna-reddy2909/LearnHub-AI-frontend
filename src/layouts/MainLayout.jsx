import { Outlet } from 'react-router-dom';

/**
 * MainLayout is a simple passthrough wrapper.
 * Each page owns its own navbar/footer to allow full-page layouts
 * (dashboard shells, quiz views, auth split-screens, etc.)
 */
const MainLayout = () => <Outlet />;

export default MainLayout;
