import { Box, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { IRoundProps } from 'react-brackets'

function getImgSize(imgSrc: string) {
  var newImg = new Image();

  newImg.onload = function () {
    var height = newImg.height;
    var width = newImg.width;
    alert('The image size is ' + width + '*' + height);
  }

  newImg.src = imgSrc;
}

const images = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 600,
    height: 400,
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 600,
    height: 400,
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 600,
    height: 400,
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 600,
    height: 400,
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 600,
    height: 400,
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 600,
    height: 400,
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 600,
    height: 400,
  },
]

export function Dashboard() {

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    setIsLoading(false)
  }, [])

  return (
    <>
      <Box p="lg" mb="lg" bg="gray.2">

        <Title order={1} mb="xl">Lista dei tornei</Title>

      </Box>
    </>
  )

}
