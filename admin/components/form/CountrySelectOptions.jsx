import { useCountries } from '@/lib/hooks/address.hook';
import { SearchSelect, SearchSelectItem } from '@tremor/react';

function CountrySelectOptions({ value, onValueChange = () => { } }) {
    const { data: countries } = useCountries();

    return (
        <SearchSelect
            value={value ? JSON.stringify(value) : ""}
            onValueChange={(country) => {
                country = country ? JSON.parse(country) : null;
                onValueChange(country);
            }}
            placeholder='Pilih Negara'
        >
            {countries?.map((country) => {
                return (
                    <SearchSelectItem value={JSON.stringify(country)} key={country.id}>
                        {country.name}
                    </SearchSelectItem>
                );
            })}
        </SearchSelect>
    )
}

export default CountrySelectOptions