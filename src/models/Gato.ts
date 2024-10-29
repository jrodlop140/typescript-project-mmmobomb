import IGato from "../interfaces/IGato";

export default class Gato implements IGato {
    breed: string;
    country: string;
    origin: string;
    coat: string;
    pattern: string;

    /**
     * Cosntructor que incializa uan instancia de Gato con todos sus atributos
     * 
     * @param breed 
     * @param country 
     * @param origin 
     * @param coat 
     * @param pattern 
     */
    
    constructor(breed: string, country: string, origin: string, coat: string, pattern: string) {
        this.breed = breed;
        this.country = country;
        this.origin = origin;
        this.coat = coat;
        this.pattern = pattern
    }










}