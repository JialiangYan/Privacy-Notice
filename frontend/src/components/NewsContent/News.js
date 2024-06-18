// Import images
import img1 from '../../assets/news/A1.webp'
import img2 from '../../assets/news/A2.webp'
import img3 from '../../assets/news/A3.webp'
import img4 from '../../assets/news/A4.webp'
import img5 from '../../assets/news/A5.webp'
import img6 from '../../assets/news/A6.webp'

// Import components
import A1 from './A1'
import A2 from './A2'
import A3 from './A3'
import A4 from './A4'
import A5 from './A5'
import A6 from './A6'

// Define articles list
const news = [
  {
    id: 0,
    title:
      'Americans say an hour of their time is worth $240, according to new Empower research',
    image: img1,
    date: 'May 01, 2024',
    source: 'Brandpoint',
    author: 'Sophia Garcia',
    component: A1,
  },
  {
    id: 1,
    title:
      "World's smallest pacemaker helps busy engineer stay active after a series of strokes from abnormal heart rhythm",
    image: img2,
    date: 'May 23, 2024',
    source: 'Brandpoint',
    author: 'David Miller',
    component: A2,
  },
  {
    id: 2,
    title:
      'USS Wisconsin commemorates 80th anniversary with World of Warships collaboration',
    image: img3,
    date: 'April 02, 2024',
    source: 'Brandpoint',
    author: 'Michael Anderson',
    component: A3,
  },
  {
    id: 3,
    title:
      'New study shows 99% of materials causing sewage clogs should never have been flushed',
    image: img4,
    date: 'April 16, 2024',
    source: 'Brandpoint',
    author: 'Olivia Jones',
    component: A4,
  },
  {
    id: 4,
    title: 'Why you should care about the Cold War',
    image: img5,
    date: 'March 21, 2024',
    source: 'Brandpoint',
    author: 'Liam Davies',
    component: A5,
  },
  {
    id: 5,
    title:
      'Not getting results from your Vitamin C serum? Here are 4 reasons why',
    image: img6,
    date: 'May 21, 2024',
    source: 'Brandpoint',
    author: 'Charlotte Moore',
    component: A6,
  },
]

// Export the list
export default news
