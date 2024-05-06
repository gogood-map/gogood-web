import { ChangeHandler, RegisterOptions } from 'react-hook-form';

export type FormInputProps = {
  register: (name: string, options?: RegisterOptions) => ({ onChange: ChangeHandler , onBlur: ChangeHandler , name: string })
}

export function FormInput() {
    return (
        <div>
            <h1>FormInput</h1>
        </div>
    )
}
