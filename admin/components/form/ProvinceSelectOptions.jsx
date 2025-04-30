import { useProvinces } from '@/lib/hooks/address.hook';
import { SearchSelect, SearchSelectItem } from '@tremor/react';

function ProvinceSelectOptions({ value, onValueChange = () => { } }) {
    const { data: provinces } = useProvinces();

    return (
        <SearchSelect
            value={value ? JSON.stringify(value) : ""}
            onValueChange={(province) => {
                province = province ? JSON.parse(province) : null;
                onValueChange(province);
            }}
            placeholder='Pilih Provinsi'
        >
            {provinces?.map((province) => {
                return (
                    <SearchSelectItem value={JSON.stringify(province)} key={province.id}>
                        {province.name}
                    </SearchSelectItem>
                );
            })}
        </SearchSelect>
    )
}

export default ProvinceSelectOptions