export const getHeightOfElement = (element: HTMLElement | null): number =>
{
    if (!element)
    {
        return 0;
    }

    const style = getComputedStyle(element);
    if (!style)
    {
        return 0;
    }

    return Number(style.height.substr(0, style.height.length - 2));
}

export const getWidthOfElement = (element: HTMLElement | null): number =>
{
    if (!element)
    {
        return 0;
    }

    const style = getComputedStyle(element);
    return Number(style.width.substr(0, style.width.length - 2));
}