import { useState } from "react";
import { Button, TextInput } from "@tremor/react";
import { KeyIcon } from "@heroicons/react/20/solid";
import { generateRamdongString } from "@/lib/utils/string";

/**
 * Renders a password input field with an option to generate a random password.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isVisible - Whether the password input field is visible.
 * @param {Function} props.onChange - The function to be called when the password value changes.
 * @param {string} props.errorMessage - The error message to be displayed.
 * @returns {JSX.Element} The PasswordInput component.
 */
function GeneratePasswordInput({ isVisible = false, onChange = () => { }, errorMessage = "" }) {
    const [showPasswordInput, setShowPasswordInput] = useState(isVisible);

    function generatePassword() {
        const ramdomPassword = generateRamdongString({ length: 12, special_chars: true, extra_special_chars: false });
        onChange(ramdomPassword);
        document.querySelector("#generatePassword").value = ramdomPassword;

        const showHidePasswordDOM = document.querySelector("#password button");
        const isTypePassword = showHidePasswordDOM.getAttribute("aria-label")?.includes("Show");

        if (isTypePassword) {
            showHidePasswordDOM.click();
        }
    }

    return (
        <>
            {showPasswordInput ? (
                <div id="password" className="flex flex-col items-start gap-3 sm:flex-row">
                    <div className="w-full max-w-sm">
                        <TextInput
                            placeholder="New Password"
                            type="password"
                            name="password"
                            id="generatePassword"
                            autoComplete="off"
                            icon={KeyIcon}
                            error={errorMessage}
                            errorMessage={errorMessage}
                            onChange={(e) => {
                                onChange(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <Button
                        type="button"
                        variant="secondary"
                        size="xs"
                        className="w-full sm:w-auto"
                        onClick={generatePassword}
                    >
                        Generate password
                    </Button>
                </div>
            ) : (
                <Button
                    onClick={() => setShowPasswordInput(true)}
                    type="button"
                    size="xs"
                    variant="primary"
                    color="slate"
                >
                    Change Password
                </Button>
            )}
        </>
    );
}

export default GeneratePasswordInput;
