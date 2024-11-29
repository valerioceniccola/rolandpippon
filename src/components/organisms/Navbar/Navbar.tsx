import {
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Image,
  Anchor,
  Drawer,
  ScrollArea,
  Divider,
  UnstyledButton, Box, Collapse, Title
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { NavLink } from "react-router-dom"

const links = [
  {
    link: '/',
    label: 'Singolari 2023',
    links: [
      { link: '/tournament/1', label: 'Roland Pippon' },
    ],
  },
  {
    link: '/',
    label: 'Singolari 2024',
    links: [
      { link: '/tournament/2', label: 'Roland Pippon' },
      { link: '/tournament/3', label: '⚡️Autumn Pippon' },
      { link: '/tournament/4', label: 'Pippon Finals' },
    ],
  },
  {
    link: '/',
    label: 'Singolari 2025',
    links: [
      { link: '/tournament/5', label: 'Pippon Open' },
      { link: '/tournament/6', label: '⚡️Spring Pippon' },
      { link: '/tournament/7', label: 'Roland Pippon' },
      { link: '/tournament/8', label: '⚡️Autumn Pippon' },
      { link: '/tournament/9', label: 'Pippon Finals' },
    ],
  },
  {
    link: '/',
    label: 'Doppi 2025',
    links: [
      // { link: '/tournament/5', label: 'Pippon Open' },
    ],
  },
  { link: '/ranking', label: 'Ranking' },
];

export function Navbar() {

  const [opened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  const items = links.map((link) => {

    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} className={classes.dropdownItem}>
        <NavLink
          to={item.link}
          className={classes.subLink}
        >
          {item.label}
        </NavLink>
      </Menu.Item>
    ))

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <NavLink
              to={link.link}
              className={classes.link}
            >
              <Title tt="uppercase" order={5}>{link.label}</Title>
            </NavLink>
          </Menu.Target>
          <Menu.Dropdown className={classes.dropdown}>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <NavLink
        key={link.label}
        to={link.link}
        className={classes.link}
      >
        <Title tt="uppercase" order={5}>{link.label}</Title>
      </NavLink>
    );
  });

  return (
    <Box className={classes.wrap}>

      <NavLink to="/">
        <Image
          src="/logo.svg"
          fit="contain"
          h={150}
          pt={20}
          pb={10}
        />
      </NavLink>

      <header className={classes.header}>

        {/*<Container size="md">*/}
          <div className={classes.inner}>
            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
            <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" hiddenFrom="sm"/>
          </div>
        {/*</Container>*/}

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          title="Roland Pippon"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px" mx="-md">

            <Divider mb="sm"/>
            <div className={classes.linksMobile}>
              {
                links.map((link) => {
                  if (link.links) {
                    return (
                      <Box key={link.link}>
                        <NavLink
                          to={link.link}
                          className={classes.link}
                          onClick={() => closeDrawer()}
                        >
                          {link.label}
                        </NavLink>
                        <Box className={classes.subMenu}>
                          {link.links.map((item) => (
                            <NavLink
                              className={classes.link}
                              key={item.label}
                              to={item.link}
                              onClick={() => closeDrawer()}
                            >
                              {item.label}
                            </NavLink>
                          ))}
                        </Box>
                      </Box>
                    )
                  } else {
                    return (
                      <NavLink
                        key={link.link}
                        to={link.link}
                        className={classes.link}
                        onClick={() => closeDrawer()}
                      >
                        {link.label}
                      </NavLink>
                    )
                  }
                })
              }
            </div>

          </ScrollArea>
        </Drawer>
      </header>
    </Box>
  );
}
