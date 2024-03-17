"use client"
import cx from 'clsx';
import Link from 'next/link';
import { userFun } from "./user.js";
import React, { useState } from 'react';

import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Drawer,
  Button,
  Anchor,
  VisuallyHidden,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderTabs.module.css';
import { redirect } from "next/navigation";



const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

const tabs = [
  { label: 'Home', url: '/home' },
  { label: 'Orders', url: '/orders' },
  { label: 'Education', url: '/education' },
  // { label: 'Community', url: '/community' },
  // { label: 'Forums', url: '/forums' },
  // { label: 'Support', url: '/support' },
  // { label: 'Account', url: '/account' },
  // { label: 'Helpdesk', url: '/helpdesk' },
];

export function Header({children}) {
  
  // const navigate = useNavigate();
  // const { tabValue } = useParams();
  // const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs
    color="gray" variant="pills" 
    radius="md"
    // value={tabValue}
    // onChange={(value) => Link(`/${value}`)}
  >
    <Tabs.Tab 
    value={tab.label}
     >
    {tab.label}
   

</Tabs.Tab>
</Tabs>
  ));
  const menuItems = tabs.map((tab) => (
    <Menu.Item key={tab.label} onClick={() => redirect(tab.url)}>
       <Anchor to={tab.url}>{tab.label}</Anchor>
    </Menu.Item>
  ));
  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          {/* <MantineLogo size={28} /> */}
<div>{children} </div>
     
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" /> */}
        
          <Menu>

          <Menu.Target>
        <Burger
        hiddenFrom="xs"
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          />
      </Menu.Target>
      <Menu.Dropdown>
     
      {menuItems}
      </Menu.Dropdown>

          </Menu>

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar 
                  // src={user.image} 
                  alt={user.email} radius="xl" size={20} />
                  {/* <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text> */}
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    // color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    // color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    // color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Change account
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Logout
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconPlayerPause style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Pause subscription
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}

// export default function Header() {
//   return (
//     <div className="flex flex-col gap-16 items-center">
//       <div className="flex gap-8 justify-center items-center">
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           rel="noreferrer"
//         >
//           {/* <SupabaseLogo /> */}
//         </a>
//         <span className="border-l rotate-45 h-6" />
//         <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
         
//         </a>
//       </div>
//       <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
//       <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
//         The fastest way to build apps with{" "}
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Supabase
//         </a>{" "}
//         and{" "}
//         <a
//           href="https://nextjs.org/"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Next.js
//         </a>
//       </p>
//       <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
//     </div>
//   );
// }
