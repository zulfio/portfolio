"use client";

import { useEffect } from "react";
import { TextInput } from "@tremor/react";
import useDebouncedCallback from "@/lib/hooks/useDebouncedCallback";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

/**
 * SearchInput is a functional React component that renders a search input with an optional debounce feature.
 * It allows triggering the search function either instantly or after pressing the Enter key, with debounce support to minimize unnecessary search calls.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} [props.placeholder="Search..."] - The placeholder text for the input field.
 * @param {function} [props.onSearch=() => {}] - A callback function to be executed when a search is triggered. It receives the search input value as its argument.
 * @param {boolean} [props.instant=true] - A boolean flag to determine whether to trigger the search instantly as the user types (true) or only when the Enter key is pressed (false).
 *
 * @example
 * // Example usage with instant search enabled
 * <SearchInput 
 *   placeholder="Search for items..." 
 *   onSearch={(value) => console.log(value)} 
 *   instant={true} 
 * />
 *
 * @example
 * // Example usage with search triggered on Enter key press
 * <SearchInput 
 *   placeholder="Search for items..." 
 *   onSearch={(value) => console.log(value)} 
 *   instant={false} 
 * />
 *
 * @returns {JSX.Element} A search input field with optional debounced search handling.
 *
 * @function
 */
function SearchInput({ placeholder = "Search...", onSearch = () => { }, instant = true }) {
    const debounceSearch = useDebouncedCallback(({ target: { value } }) => {
        instant && onSearch(value);
    }, 600);

    useEffect(() => {
        return () => {
            debounceSearch.cancel();
        };
    }, [debounceSearch]);

    function handleKeyDown(event) {
        if (event.key === 'Enter' && !instant) {
            onSearch(event.target.value);
        }
    }

    return <TextInput icon={MagnifyingGlassIcon} placeholder={placeholder} onChange={debounceSearch} onKeyDown={handleKeyDown} />;
}

export default SearchInput;
