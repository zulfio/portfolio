import { useSubdistrict } from '@/lib/hooks/address.hook';
import { SearchSelect, SearchSelectItem } from '@tremor/react';

function SubdistrictSelectOptions({ cityId, value, onValueChange = () => { } }) {
    const { data: subdistricts } = useSubdistrict(cityId);

    return (
        <SearchSelect
            value={value ? JSON.stringify(value) : ""}
            onValueChange={(subdistrict) => {
                subdistrict = subdistrict ? JSON.parse(subdistrict) : null;
                onValueChange(subdistrict);
            }}
            placeholder='Pilih Kecamatan'
        >
            {subdistricts?.map((subdistrict) => {
                return (
                    <SearchSelectItem value={JSON.stringify(subdistrict)} key={subdistrict.id}>
                        {subdistrict.name}
                    </SearchSelectItem>
                );
            })}
        </SearchSelect>
    )
}

export default SubdistrictSelectOptions