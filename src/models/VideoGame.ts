import IVideoGame from "../interfaces/IVideoGame";

export default class VideoGame implements IVideoGame {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    game_url: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    profile_url: string;


    constructor(id: number, title: string, thumbnail: string, short_description: string, game_url: string, genre: string, platform: string, publisher: string, developer: string, release_date: string, profile_url: string) {
        this.id = id;
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.short_description = short_description;
        this.game_url = game_url;
        this.genre = genre;
        this.platform = platform;
        this.publisher = publisher;
        this.developer = developer;
        this.release_date = release_date;
        this.profile_url = profile_url;
    }


    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter $title
     * @return {string}
     */
    public get $title(): string {
        return this.title;
    }

    /**
     * Getter $thumbnail
     * @return {string}
     */
    public get $thumbnail(): string {
        return this.thumbnail;
    }

    /**
     * Getter $short_description
     * @return {string}
     */
    public get $short_description(): string {
        return this.short_description;
    }

    /**
     * Getter $game_url
     * @return {string}
     */
    public get $game_url(): string {
        return this.game_url;
    }

    /**
     * Getter $genre
     * @return {string}
     */
    public get $genre(): string {
        return this.genre;
    }

    /**
     * Getter $platform
     * @return {string}
     */
    public get $platform(): string {
        return this.platform;
    }

    /**
     * Getter $publisher
     * @return {string}
     */
    public get $publisher(): string {
        return this.publisher;
    }

    /**
     * Getter $developer
     * @return {string}
     */
    public get $developer(): string {
        return this.developer;
    }

    /**
     * Getter $release_date
     * @return {string}
     */
    public get $release_date(): string {
        return this.release_date;
    }

    /**
     * Getter $profile_url
     * @return {string}
     */
    public get $profile_url(): string {
        return this.profile_url;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter $title
     * @param {string} value
     */
    public set $title(value: string) {
        this.title = value;
    }

    /**
     * Setter $thumbnail
     * @param {string} value
     */
    public set $thumbnail(value: string) {
        this.thumbnail = value;
    }

    /**
     * Setter $short_description
     * @param {string} value
     */
    public set $short_description(value: string) {
        this.short_description = value;
    }

    /**
     * Setter $game_url
     * @param {string} value
     */
    public set $game_url(value: string) {
        this.game_url = value;
    }

    /**
     * Setter $genre
     * @param {string} value
     */
    public set $genre(value: string) {
        this.genre = value;
    }

    /**
     * Setter $platform
     * @param {string} value
     */
    public set $platform(value: string) {
        this.platform = value;
    }

    /**
     * Setter $publisher
     * @param {string} value
     */
    public set $publisher(value: string) {
        this.publisher = value;
    }

    /**
     * Setter $developer
     * @param {string} value
     */
    public set $developer(value: string) {
        this.developer = value;
    }

    /**
     * Setter $release_date
     * @param {string} value
     */
    public set $release_date(value: string) {
        this.release_date = value;
    }

    /**
     * Setter $profile_url
     * @param {string} value
     */
    public set $profile_url(value: string) {
        this.profile_url = value;
    }


}