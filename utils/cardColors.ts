export interface CardColors {
    borderColor: string;
    backgroundColor: string;
}


export const cardColorVariants: CardColors[] = [
    {
        borderColor: '#C5BEE2',
        backgroundColor: '#F3F0F9',
    },
    {
        borderColor: '#31a683',
        backgroundColor: '#E6F7F2',
    },
];

export const getCardColorsByID = (id: number): CardColors => {
    return cardColorVariants[id % cardColorVariants.length];
};

