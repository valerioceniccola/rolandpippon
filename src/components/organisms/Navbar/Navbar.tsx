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
  UnstyledButton, Box, Collapse, Title, Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { NavLink, useNavigate } from "react-router-dom"
import { Dropdown } from "react-nested-dropdown"
import 'react-nested-dropdown/dist/styles.css'
import { projectName } from "../../../utils/constants.ts"

export function Navbar() {

  const navigate = useNavigate()

  const [opened, { toggle }] = useDisclosure(false)
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)

  const links = [
    // {
    //   type: 'default',
    //   label: 'Tutti i tornei',
    //   onSelect: () => navigate('/'),
    // },
    {
      type: 'dropdown',
      label: 'Singolari',
      data: [
        {
          label: '2025',
          items: [
            {
              label: 'Pippon Open',
              onSelect: () => navigate('/tournament/5'),
            },
            {
              label: 'Spring Pippon ⚡',
              onSelect: () => navigate('/tournament/6'),
            },
            {
              label: 'Roland Pippon',
              onSelect: () => navigate('/tournament/7'),
            },
            {
              label: 'Autumn Pippon ⚡',
              onSelect: () => navigate('/tournament/8'),
            },
            {
              label: 'Pippon Finals',
              onSelect: () => navigate('/tournament/9'),
            },
          ],
        },
        {
          label: '2024',
          items: [
            {
              label: 'Roland Pippon',
              onSelect: () => navigate('/tournament/2'),
            },
            {
              label: 'Autumn Pippon ⚡',
              onSelect: () => navigate('/tournament/3'),
            },
            {
              label: 'Pippon Finals',
              onSelect: () => navigate('/tournament/4'),
            },
          ],
        },
        {
          label: '2023',
          items: [
            {
              label: 'Roland Pippon',
              onSelect: () => navigate('/tournament/1'),
            },
          ],
        },
      ]
    },
    {
      type: 'dropdown',
      label: 'Doppi',
      data: [
        {
          label: '2025',
          items: [
            {
              label: 'Double Pippon',
              onSelect: () => navigate('/tournament/10'),
            },
            {
              label: 'Pippon Davis',
              onSelect: () => navigate('/tournament/11'),
            },
          ],
        }
      ]
    },
    {
      type: 'default',
      label: 'Ranking',
      onSelect: () => navigate('/ranking'),
    },
    {
      type: 'default',
      label: 'Tennisti',
      onSelect: () => navigate('/players'),
    }
  ]

  return (
    <Box className={classes.wrap}>

      <NavLink to="/">
        <Image
          src="/logo.svg"
          className={classes.logo}
          fit="contain"
          pt={20}
          pb={10}
        />
      </NavLink>

      <header className={classes.header}>

        <Box visibleFrom="sm" className={classes.headerInset}>
          {
            links.map((link) => {
              if (link.type === 'dropdown') {
                return (
                  <Dropdown
                    key={link.label}
                    items={link.data!}
                    containerWidth={140}
                    className={classes.dropdown}
                  >
                    {({ isOpen, onClick }) => (
                      <Title
                        className={classes.link}
                        onClick={onClick}
                      >
                        {link.label}
                      </Title>
                    )}
                  </Dropdown>
                )
              } else {
                return (
                  <Title
                    key={link.label}
                    className={classes.link}
                    onClick={link.onSelect}
                  >
                    {link.label}
                  </Title>
                )
              }
            })
          }
        </Box>

        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          size="sm"
          hiddenFrom="sm"
        />

      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        title={projectName}
        hiddenFrom="sm"
        zIndex={1000000}
      >

        <ScrollArea mx="-md">

          <Divider mb="sm"/>

            {
              links.map((link) => {
                if (link.type === 'dropdown') {
                  return (
                    <Box key={link.label}>
                      <Title
                        tt="uppercase"
                        className={classes.linkMobile}
                      >
                        {link.label}
                      </Title>
                      <Box className={classes.subMenu}>
                        {link.data!.map((item: any) => (
                          <div
                            key={item.label}
                            className={classes.subMenuBlock}
                          >
                            <Title
                              tt="uppercase"
                              order={6}
                              key={item.label}
                              className={classes.subMenuTitle}
                            >
                              {item.label}
                            </Title>
                            {
                              item.items.map((subItem: any) => (
                                <Title
                                  tt="uppercase"
                                  order={5}
                                  key={subItem.label}
                                  onClick={() => {
                                    subItem.onSelect()
                                    closeDrawer()
                                  }}
                                  className={classes.subMenuItem}
                                >
                                  {subItem.label}
                                </Title>
                              ))
                            }
                          </div>
                        ))}
                      </Box>
                    </Box>
                  )
                } else {
                  return (
                    <Title
                      tt="uppercase"
                      key={link.label}
                      className={classes.linkMobile}
                      onClick={() => {
                        if (link.onSelect) {
                          link.onSelect()
                          closeDrawer()
                        }
                      }}
                    >
                      {link.label}
                    </Title>
                  )
                }
              })
            }

        </ScrollArea>
      </Drawer>

    </Box>
  );
}
