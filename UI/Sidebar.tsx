import { useState } from 'react';
import cs from 'classnames';
import { Permission, selectUserPermitions } from '../../store/slices/userSlice';
import styles from './Sidebar.module.css';
import Icon, { IconT } from './Icon';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/marteLined.png';
const menuItems = [
  { id: 'home', icon: IconT.home, label: 'Home', navigateTo: '/home' },
  { id: 'pos', icon: IconT.cart, label: 'Point of Sale', navigateTo: '/pos' },
  { id: 'stocks', icon: IconT.stocks, label: 'Inventory', navigateTo: '/stocks' },
  {
    id: 'history',
    icon: IconT.history,
    label: 'Sales History',
    navigateTo: '/history',
    withPermission: Permission.MANAGE_SELLING_HISTORY,
  },
  { id: 'profile', icon: IconT.user, label: 'Profile', navigateTo: '/profile' },
];


const Sidebar = () => {
  const userPermitions = useSelector(selectUserPermitions);
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cs(styles.sidebar, {
        [styles.collapsed]: collapsed,
        [styles.expanded]: !collapsed,
      })}
    >
      <div className={styles.logoContainer}>
        <img
          src={logo}
          alt='Logo'
          className={cs(styles.logo, {
            [styles.collapsedLogo]: collapsed,
          })}
        />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={styles.menuToggle}
        >
          <Icon icon={IconT.arrowL} className={styles.toggleIcon} />
        </button>
      </div>
      <ul className={styles.menuList}>
        {menuItems.map((item) =>
          !item.withPermition ||
          userPermitions?.includes(item.withPermition) ? (
            <li
              key={item.id}
              className={cs(styles.menuItem, {
                [styles.activeMenuItem]: location.pathname.startsWith(
                  item.navigateTo
                ),
              })}
              onClick={() => navigate(item.navigateTo)}
            >
              <Icon icon={item.icon} className={styles.menuIcon} />
              {!collapsed && (
                <div className={styles.menuLabel}>{item.label}</div>
              )}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
