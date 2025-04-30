import { useCities } from '@/lib/hooks/address.hook';
import { SearchSelect, SearchSelectItem } from '@tremor/react';

function CitySelectOptions({ provinceId, value, onValueChange = () => { } }) {
    const { data: cities } = useCities(provinceId);

    return (
        <SearchSelect
            value={value ? JSON.stringify(value) : ""}
            onValueChange={(city) => {
                city = city ? JSON.parse(city) : null;
                onValueChange(city);
            }}
            placeholder='Pilih Kota'
        >
            {cities?.map((city) => {
                return (
                    <SearchSelectItem value={JSON.stringify(city)} key={city.id}>
                        {city.name}
                    </SearchSelectItem>
                );
            })}
        </SearchSelect>
    )
}

export default CitySelectOptions