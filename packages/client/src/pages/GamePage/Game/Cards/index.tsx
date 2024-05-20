import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { generateRandomNumbers } from '../../util'

interface CardDescription {
  id: number
  text: string
}

interface CardsProps {
  upgradePick: (id: number) => void
}

const CardsDescription: CardDescription[] = [
  {
    id: 0,
    text: 'increases the players speed by 10%',
  },
  {
    id: 1,
    text: 'adds 1 heart to the player',
  },
  {
    id: 2,
    text: 'upgrade weapon by 1 level',
  },
  {
    id: 3,
    text: 'increases the players reload speed by 25%',
  },
  {
    id: 4,
    text: 'increases crystal collection range by 20%',
  },
  {
    id: 5,
    text: 'Thanos snap...',
  },
  {
    id: 6,
    text: '10 SECONDS OF FLAMETHROWER',
  },
  {
    id: 7,
    text: '10 SECONDS OF IMMORTALITY',
  },
]

function Cards({ upgradePick }: CardsProps) {
  const [cards, setCards] = useState<CardDescription[]>([])

  useEffect(() => {
    const randCards = generateRandomNumbers(0, 7)
    const resultCardsArray = []
    for (let i = 0; i < randCards.length; i++) {
      resultCardsArray.push(CardsDescription[randCards[i]])
    }
    setCards(resultCardsArray)
  }, [])

  return (
    <div className={styles.cards_container}>
      {cards.map(el => (
        <div
          className={styles.card}
          style={{ backgroundColor: el.id > 4 ? '#ffe6b0' : '#b0ffd5' }}
          onClick={() => upgradePick(el.id)}
          key={'card' + el.id}>
          <div
            className={styles.card_image}
            style={{ backgroundPositionX: el.id * -18 + 'vh' }}></div>
          <p>{el.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Cards
