import Walkthrough, { WalkthroughSection } from './Walkthrough'

const SECTIONS: WalkthroughSection[] = [
  {
    id: 'map',
    label: 'A — Measure on the map',
    title: 'Click round the edge and the area is in the quote.',
    lede: "A real run through the app: a 51.5 m² block paving area measured from the satellite view, the kerb added, and the price worked out. No tape measure for the first number, and no figures copied off the back of an envelope.",
    video: {
      src: 'measure-on-map.mp4',
      poster: 'measure-on-map-poster.webp',
      label: 'Measuring a block paving area on the satellite map and adding it to a quote',
      duration: 'PT52S',
    },
    steps: [
      {
        heading: 'Add the task, then tap Measure on map',
        body: 'Start a Landscaping quote, add Block Paving, and tap Measure on map under the Area box. Type an address or postcode in the search bar to jump to the site.',
        image: 'map-blank.webp',
        alt: 'The Block Paving task form in PriceM8, with the Measure on map and Sketch shape links under the Area box.',
      },
      {
        heading: 'Click each corner',
        body: 'Click round the edge one corner at a time. The area and the length of the outline build up as you go, 51.5 m² and 30.6 m here, and you can drag any corner to adjust it.',
        image: 'map-outline.webp',
        alt: 'A satellite view of a front drive outlined in green, with 51.5 square metres and an outline of 30.6 metres shown underneath.',
      },
      {
        heading: 'Use the area',
        body: 'Tap Use area and the figure drops straight into the task. Sub-base depth, how it will be dug out and access are all there to set.',
        image: 'map-use-area.webp',
        alt: 'The Block Paving form with the area now filled in as 51.5 square metres.',
      },
      {
        heading: 'Add the kerb',
        body: 'Switch on edging and the kerb length has its own Measure on map button. Pin kerb is priced from your own Materials list, so a change there changes the quote.',
        image: 'map-edging.webp',
        alt: 'The edging section of the Block Paving form with pin kerb selected, a length of 31 metres and a Measure on map link.',
      },
      {
        heading: 'The line on the quote',
        body: 'The task becomes a line your customer can read: "Install 51.5 m² of block paving on a 150mm MOT Type 1 sub-base. Includes 31m of pin kerb edging. Excavation by digger." That is £9,024 for the paving, plus £438 for the grab lorry, before VAT.',
        image: 'map-quote.webp',
        alt: 'The client quote for a block paving job showing the written description of the work and a price of 9,024 pounds.',
      },
    ],
    note: "The app says it itself: satellite images can be a few years old and slightly out of place, so check measurements on site before you price a job. The map gets you to a sensible first number fast. The tape measure confirms it.",
  },
  {
    id: 'sketch',
    label: 'B — When there is no clear outline',
    title: 'Trees in the way? Sketch the shape.',
    lede: "Some jobs can't be measured from above: the view is blocked, or it isn't built yet. Next to Measure on map is Sketch shape. You walk round the edge and type in what you find.",
    video: {
      src: 'sketch-pad.mp4',
      poster: 'sketch-pad-poster.webp',
      label: 'Sketching an L-shaped patio from its side lengths to get the area',
      duration: 'PT52S',
    },
    steps: [
      {
        heading: 'Tap Sketch shape',
        body: 'It sits right beside Measure on map under the Area box on any task that is priced by the square metre.',
        image: 'sketch-button.webp',
        alt: 'The Porcelain Paving task form with Measure on map and Sketch shape links under the Area box.',
      },
      {
        heading: 'Walk round the edge',
        body: 'Enter each side\'s length, then which way you turn at the corner. Corners are square unless you change the angle. The shape draws itself and the area updates as you go: 48 m² for this L-shaped patio. If the sides don\'t quite meet up, it tells you how far out they finish so you can recheck the last measurement.',
        image: 'sketch-shape.webp',
        alt: 'The Sketch a shape screen showing an L-shaped outline with side lengths of 5, 7, 4, 3, 2 and 10 metres and a total of 48 square metres.',
      },
    ],
  },
]

export default function MeasureOnTheMap() {
  return (
    <Walkthrough
      path="/walkthroughs/measure-a-garden-on-the-map"
      seoTitle="Measure a garden on the satellite map and price the job – PriceM8 walkthrough"
      seoDescription="Watch a block paving job measured on the satellite map, with the area and the kerb length going straight into the quote. Includes the sketch pad for awkward shapes."
      eyebrow="Walkthrough · 1 · Measuring"
      heading="Measure it from the map, then price it."
      lede="Most of the time lost on a quote is getting the measurements in. This is how PriceM8 does it from the map, or from a sketch when the map can't help."
      sections={SECTIONS}
      next={[
        { to: '/walkthroughs/quote-to-invoice', label: 'Next', text: 'From the numbers to a quote you can send, and the invoice after it' },
        { to: '/walkthroughs/get-paid-by-bank-payment', label: 'Later', text: 'Getting paid by bank payment' },
      ]}
      closing={{
        heading: 'Measure the next one this way.',
        text: "Put a job you've already done through it. If the area and the price land close to what you found on site, you'll know what it is worth to you.",
      }}
    />
  )
}
