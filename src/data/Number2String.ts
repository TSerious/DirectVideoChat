export const number2string = (val: number | undefined): string =>
{
    if (val === undefined)
    {
        return "<undefined>";
    }

    const abs = Math.abs(val);

    if (abs === 0)
    {
        return "0";
    }

    if (abs < 0.001 || abs > 1000)
    {
        return number2exponentialString(val);
    }

    let res = "";
    if (abs < 0.01)
    {
        res = val.toFixed(5);
    }
    else if (abs < 0.1)
    {
        res = val.toFixed(4);
    }
    else if (abs < 1)
    {
        res = val.toFixed(2);
    }
    else if (abs < 10)
    {
        res = val.toFixed(2);
    }
    else if (abs < 100)
    {
        res = val.toFixed(1);
    }
    else
    {
        res = val.toFixed(0);
    }

    return removeTrailingZeros(res);
}

export const removeTrailingZeros = (input: string): string =>
{
    if (!input.includes("."))
    {
        return input;
    }

    let res = input.replace(/0+$/,"");
    if (res.endsWith("."))
    {
        res = res.replace(".","");
    }

    return res;
}

export const number2exponentialString = (val: number): string =>
{
    let str = val.toExponential().toUpperCase();
    let base = Number(str.substr(0, str.indexOf("E"))).toFixed(2);
    base = removeTrailingZeros(base);
    let exp = str.substr(str.indexOf("E"));
    exp = exp.replace("+","");

    str = base + exp ;
    return str;
}

export const checkStringIsNumberValue = (value: string): boolean =>
{
    if (value === '' || isNaN(Number(value)))
    {
        return false;
    }
    else
    {
        return true;
    }
}

export const getNumberAsString = (n: number|undefined): string =>
{
    if (n === undefined)
    {
        return Number.NaN.toString();
    }

    return n.toString();
}