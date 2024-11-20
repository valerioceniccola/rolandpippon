import { Menu, Group, Center, Burger, Container, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';

const links = [
  {
    link: '#1',
    label: 'Tornei',
    links: [
      { link: '/tournaments/edizione1', label: 'Prima edizione' },
      { link: '/tournaments/edizione2', label: 'Seconda edizione' },
      { link: '/tournaments/edizione3', label: 'Terza edizione' },
      { link: '/tournaments/finals24', label: 'Finals 2024' },
    ],
  },
  { link: '/about', label: 'Ranking' },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                {/*<IconChevronDown size="0.9rem" stroke={1.5}/>*/}
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <>
      <Image
        src="/logo.svg"
        fit="contain"
        h={180}
        py={20}
      />
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
