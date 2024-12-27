import { Menu, Group, Center, Burger, Container, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Footer.module.css';
import { useEffect, useState } from "react"
import { projectName } from "../../../utils/constants.ts"

export function Footer() {

  const [currentYear, setCurrentYear] = useState<null | number>(null)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, []);

  return (
    <Container className={classes.afterFooter}>
      <Text c="dimmed" size="sm">
        © {currentYear} All rights reserved. {projectName} 🌱🎾
      </Text>
    </Container>
  );
}
