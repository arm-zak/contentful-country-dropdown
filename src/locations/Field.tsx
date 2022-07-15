import React, {useEffect, useState} from 'react';
import {Select} from '@contentful/f36-components';
import {FieldExtensionSDK} from '@contentful/app-sdk';
import { useSDK} from '@contentful/react-apps-toolkit';
import {countries} from "../components/Countries";

const Field = () => {
    const sdk = useSDK<FieldExtensionSDK>();
    const [value, setValue] = useState(sdk.field.getValue());

    useEffect(() => {
        sdk.window.updateHeight()
    }, [sdk.window]);
    useEffect(() => {
        const detach = sdk.field.onValueChanged((value) => {
            setValue(value);
        });
        return () => detach();
    }, [sdk.field]);

    return <Select
        id="country-dropdown"
        name="country-dropdown"
        value={value}
        onChange={(e) => sdk.field.setValue(e.target.value)}
    >
        {countries.map((country) =>
            <Select.Option key={country.id} value={country.id}>{country.text}</Select.Option>
        )}
    </Select>;
};

export default Field;
