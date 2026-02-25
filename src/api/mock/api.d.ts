export declare function getCountries(): Promise<Response>;
export declare function searchGeo(query?: string): Promise<Response>;
export declare function startSearchPrices(countryID: string): Promise<Response>;
export declare function getSearchPrices(token: string): Promise<Response>;
export declare function stopSearchPrices(token: string): Promise<Response>;
export declare function getHotels(countryID: string): Promise<Response>;
export declare function getHotel(hotelId: number | string): Promise<Response>;
export declare function getPrice(priceId: string): Promise<Response>;
