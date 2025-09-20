
/**
 * It's impossible to be 100% sure of anything in the complicated spaces of the internet
 * where identifying anyone relies primarily on honesty. We will create likelihood scores
 * by returning "Confidence" identifiers from each function.
 */
export enum Confidence {
    NO = 0,
    PROBABLY_NO = 1,
    PROBABLY_YES = 2,
    YES = 3
}