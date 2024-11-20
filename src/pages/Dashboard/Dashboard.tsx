import { Box, Text, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { Bracket, IRoundProps } from 'react-brackets'
import { Gallery } from "react-grid-gallery"

const rounds: IRoundProps[] = [
  {
    title: 'Ottavi',
    seeds: [
      {
        id: 1,
        date: '3-6 / 5-5 (W.O.)',
        teams: [{ name: 'S. Florio' }, { name: 'V. Ceniccola 🎾' }],
      },
      {
        id: 2,
        date: '6-4 / 3-6 / 7-2',
        teams: [{ name: 'A. Vernetti 🎾' }, { name: 'S. Compagnone' }],
      },
      {
        id: 3,
        date: '6-7 / 4-6',
        teams: [{ name: 'L. Petrone' }, { name: 'Cristian 🎾' }],
      },
      {
        id: 4,
        date: '7-5 / 1-6 / 7-4',
        teams: [{ name: 'Alessandro 🎾' }, { name: 'G. Giusti' }],
      },
      {
        id: 5,
        date: '1-6 / 2-6',
        teams: [{ name: 'S. Stanziano' }, { name: 'A. Crisci 🎾' }],
      },
      {
        id: 6,
        date: '2-6 / 2-6',
        teams: [{ name: 'E. Gagliotta' }, { name: 'M. Piacci 🎾' }],
      },
      {
        id: 7,
        date: '6-10 / 5-7 / 6-2',
        teams: [{ name: 'G. Zambrano' }, { name: 'G. Russo 🎾' }],
      },
      {
        id: 8,
        date: '4-6 / 4-6',
        teams: [{ name: 'A. Sibillo' }, { name: 'Gianlorenzo 🎾' }],
      },
    ],
  },
  {
    title: 'Quarti',
    seeds: [
      {
        id: 9,
        date: '7-5 / 3-6 / 10-8',
        teams: [{ name: 'V. Ceniccola 🎾' }, { name: 'A. Vernetti' }],
      },
      {
        id: 10,
        date: '7-5 / 4-6 / 1-7',
        teams: [{ name: 'Cristian' }, { name: 'Alessandro  🎾' }],
      },
      {
        id: 11,
        date: '6-4 / 6-3',
        teams: [{ name: 'A. Crisci 🎾' }, { name: 'M. Piacci' }],
      },
      {
        id: 12,
        date: '6-2 / 6-2',
        teams: [{ name: 'G. Russo 🎾' }, { name: 'Gianlorenzo' }],
      },
    ],
  },
  {
    title: 'Semifinale',
    seeds: [
      {
        id: 13,
        date: 'Da giocare',
        teams: [{ name: 'V. Ceniccola' }, { name: 'Alessandro' }],
      },
      {
        id: 14,
        date: 'Da giocare',
        teams: [{ name: 'A. Crisci' }, { name: 'G. Russo' }],
      },
    ],
  },
  {
    title: 'Finale',
    seeds: [
      {
        id: 15,
        date: '-',
        teams: [{ name: '-' }, { name: '-' }],
      },
    ],
  },
]

function getImgSize(imgSrc: string) {
  var newImg = new Image();

  newImg.onload = function() {
    var height = newImg.height;
    var width = newImg.width;
    alert ('The image size is '+width+'*'+height);
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

  const theme = useMantineTheme()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    setIsLoading(false)
  }, [])

  return (
    <>
      <Box p="lg" mb="lg" bg="gray.2">
        <Bracket
          rounds={rounds}
          // roundTitleComponent={(title, roundIndex: number) => {
          //   return <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>;
          // }}
        />
      </Box>
      <Box>
        <Gallery
          images={images}
          enableImageSelection={false}
        />
      </Box>
    </>
  )

}
