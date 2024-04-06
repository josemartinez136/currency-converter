import { useEffect, useState } from "react"
import { HiArrowsRightLeft } from "react-icons/hi2";
import CurrencyDropDown from "./DropDown";

const CurrencyConverter = () => {

    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1)

    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, settoCurrency] = useState("TRY")
    const [amountConverted, setAmountConverted] = useState(null)
    const [converting, setConverting] = useState(false)
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["TRY", "USD"]);


    // https://api.frankfurter.app/currencies;
    const fetchCurrencies = async () => {
        try {
            const res = await fetch("https://api.frankfurter.app/currencies")
            const data = await res.json()

            setCurrencies(Object.keys(data))
        } catch (error) {
            console.error("Error Fetching", error)
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);
    console.log(currencies);


    const convertCurrency = async () => {
        if (!amount) return
        setConverting(true)
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
            const data = await res.json()

            setAmountConverted(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            console.error("Error Fetching", error)
        } finally { setConverting(false) }
    }

    const handleFavorite = (currency) => {
        let updatedFavorites = [...favorites]

        if (favorites.includes(currency)) {
            updatedFavorites = updatedFavorites.filter((fav) => fav !== currency)
        } else {
            updatedFavorites.push(currency)
        }

        setFavorites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    }

    const swapCurrencies = () => {
        setFromCurrency(toCurrency)
        settoCurrency(fromCurrency)
    }

    // https://api.frankfurter.app/latest?amount=1&from=USD$to=TRY ;


    return (
        <div className="max-w-xl mx-auto my-10 p-5 bg-blue-200 rounded-lg shadow-md">
            <h2 className="mb-5 text-2xl font-semibold text-pink-700 text-center">Currency Convertor</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <CurrencyDropDown favorites={favorites} currencies={currencies} title="From" currency={fromCurrency} setCurrency={setFromCurrency} handleFavorite={handleFavorite} />
                <div className="flex justify-center -mb-5 sm:mb-0">
                    <button onClick={swapCurrencies} className="p-2 bg-white rounded-full cursor-pointer hover:bg-pink-300">
                        <HiArrowsRightLeft className="text-xl text-gray-700" />
                    </button>
                </div>
                {/*swappig currency button */}
                <CurrencyDropDown favorites={favorites} currencies={currencies} title="To:" currency={toCurrency} setCurrency={settoCurrency} handleFavorite={handleFavorite} />

            </div>

            <div className="mt-4">
                <label htmlFor="amount" className="block text-sm font-medium text-black-700">Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 mt-1" />
            </div>

            <div className="flex justify-end mt-6">
                <button onClick={convertCurrency} className={`px-5 py-2 bg-pink-600 text-white rounded-md hover:bg-blue-700 focus:outline-none  focus:ring-offset-2 ${converting ? "animate-pulse" : ""}`}>Convert</button>
            </div>

            {amountConverted && <div className="mt-4 text-lg font-medium text-right text-pink-700 font-bold">
                Converted Amount: {amountConverted}
            </div>}

        </div>
    )
}

export default CurrencyConverter
