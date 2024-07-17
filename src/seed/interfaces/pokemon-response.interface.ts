export interface IPokemonResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  IPokemonResult[];
}

export interface IPokemonResult {
    name: string;
    url:  string;
}
