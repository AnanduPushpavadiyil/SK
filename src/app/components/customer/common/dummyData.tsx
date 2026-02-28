export interface Product {
  name: string;
  image: string;
  width: number;
  height: number;
}

export const products: Product[] = [
  {
    image: './images/gallery/0C1A1179.jpg',
    name: '23T052832',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/0C1A1180.jpg',
    name: '23T052832',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/0C1A1182-2.jpg',
    name: '25T085431',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/0C1A7688.jpg',
    name: '25T085431',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/0C1A7749.jpg',
    name: '19T071850',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/0C1A7750.jpg',
    name: '22T051435',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/0C1A7776.jpg',
    name: '22T051435',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A0705.jpg',
    name: '26T134028',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A0736.jpg',
    name: '26T134028',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A0737.jpg',
    name: '24T060155',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A0740.jpg',
    name: '24T060155',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A0742.jpg',
    name: '26T044633',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A0970.jpg',
    name: '27T041853',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A0980.jpg',
    name: '27T041853',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A0999.jpg',
    name: '27T081758',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A1140.jpg',
    name: '27T081758',
    width: 300,
    height: 400,
  },
  {
    image: './images/gallery/113A1349.jpg',
    name: '06T104505',
    width: 300,
    height: 400,
  },
];

export const dummyReviews = () => {
  return [
    {
      author_name: 'Sandra',
      rating: 5,
      text: 'Absolutely stunning photos! Every moment of our wedding was beautifully captured.',
      profile_photo_url:
        './images/gallery/IMG_8790.jpg',
    },
    {
      author_name: 'Jasmin',
      rating: 4,
      text: 'Professional and creative! The shots were amazing and the team was very friendly.',
      profile_photo_url:
        './images/gallery/JIT_4077.jpg',
    },
    {
      author_name: 'Veena',
      rating: 4,
      text: 'I couldn’t be happier with our wedding photos. They perfectly captured the emotions of the day.',
      profile_photo_url:
        './images/gallery/ashr.jpg',
    },
    {
      author_name: 'Snika',
      rating: 5,
      text: 'Great experience! The photographer was very patient and made everyone feel comfortable.',
      profile_photo_url:
        './images/gallery/IMG_4170.jpg',
    },
  ];
};

export const designerServices = [
  {
    title: 'Pre-Wedding Shoot',
    description:
      'Capture the magic before your big day with a personalized pre-wedding session.',
    imageUrl: './images/gallery/IMG_8796.jpg',
  },
  {
    title: 'Wedding Ceremony Photography',
    description:
      'Document every moment of your wedding ceremony with elegance and style.',
    imageUrl: './images/gallery/JIT_2710.jpg',
  },
  {
    title: 'Reception & Event Coverage',
    description:
      'Professional coverage of your reception, party, and all special celebrations.',
    imageUrl: './images/gallery/JIT_4872.jpg',
  },
];
