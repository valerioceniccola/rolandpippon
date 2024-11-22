import { Menu, Group, Center, Burger, Container, Image, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { NavLink } from "react-router-dom"

const links = [
  {
    link: '#',
    label: 'Tornei',
    links: [
      { link: '/tournament/1', label: 'Prima edizione' },
      { link: '/tournament/2', label: 'Seconda edizione' },
      { link: '/tournament/3', label: 'Terza edizione' },
      { link: '/tournament/4', label: 'Finals 2024' },
    ],
  },
  { link: '/ranking', label: 'Ranking' },
  { link: '/about', label: "Albo d'oro" },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {

    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>
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
            <div
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
              </Center>
            </div>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <NavLink
        key={link.label}
        to={link.link}
        className={classes.link}
      >
        {link.label}
      </NavLink>
    );
  });

  return (
    <>
      <NavLink to="/">
        <Image
          src="/logo.svg"
          fit="contain"
          h={180}
          py={20}
        />
      </NavLink>
      <header className={classes.header}>
        <Container size="md">
          <div className={classes.inner}>
            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm"/>
          </div>
        </Container>
      </header>
    </>
  );
}
