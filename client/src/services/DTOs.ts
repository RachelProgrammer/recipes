export type Category = { Id: string, Name: string };
export type Recipe = {
    Id: string,
    Name: string,
    UserId: number,
    CategoryId: string,
    Img: any,
    Duration: string, // TODO
    Difficulty: string,
    Description: string,
    Ingrident: Ingrident[],
    Instructions: string[]
};
export type Ingrident = {
    quantity: string,
    type: string,
    name: string
};

export type User = {
    Id: number;
    Username: string;
    Password: string;
    Name: string;
    Phone: string;
    Email: string;
    Tz: string;
}