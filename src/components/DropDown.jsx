import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyDropDown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
    title = " ",
}) => {

    const isFavorites = curr => favorites.includes(curr)

    return (
        <div>
            <label htmlFor={title} className="block text-sm font-medium text-gray-700">{title}</label>
            <div className="mt-1 relative">
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">

                    {favorites.map((currency) => {
                        return (<option value={currency} key={currency}>
                            {currency}
                        </option>
                        )
                    })}

                    <hr />

                    {currencies
                        .filter(c => !favorites.includes(c)) //this makes sure that the letters/currency are not selected as favoritesadn also showing up on the ddown menu options
                        .map((currency) => {
                            return (
                                <option value={currency} key={currency}>
                                    {currency}
                                </option>
                            );
                        })}
                </select>
                <button onClick={() => handleFavorite(currency)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5">
                    {isFavorites(currency) ? <HiStar /> : <HiOutlineStar />}
                </button>
            </div>
        </div>
    )
}

export default CurrencyDropDown;
