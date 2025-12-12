import { FaArrowRightToCity, FaCarSide, FaChartArea } from 'react-icons/fa6';
import { Outlet } from 'react-router';
import type { SidebarGroup } from '@/03_templates/_components/main-template-sidebar';
import MainTemplate from '@/03_templates/main-template';
import { hasPermission } from '@/lib/user/has-permission';

const MoveLayout = () => {
  const sidebarGroups: SidebarGroup[] = [
    ...(hasPermission('view-connext-move-admin')
      ? [
          {
            group: 'Connext Move Admin',
            links: [
              {
                name: 'Dashboard',
                url: '/move/admin',
                icon: FaChartArea,
                end: true,
              },
              {
                name: 'Transport Requests',
                url: '/move/admin/transport-requests',
                icon: FaArrowRightToCity,
              },
              {
                name: 'Vehicles',
                url: '/move/admin/vehicles',
                icon: FaCarSide,
              },
            ],
          },
        ]
      : []),

    {
      group: 'Connext Move',
      links: [
        {
          name: 'My Transport Requests',
          url: '/move',
          icon: FaArrowRightToCity,
          end: true,
        },
      ],
    },
  ];

  return (
    <MainTemplate sidebarGroups={sidebarGroups}>
      <Outlet />
    </MainTemplate>
  );
};

export default MoveLayout;
