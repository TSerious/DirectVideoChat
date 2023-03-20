import { getPlatforms } from '@ionic/react';


export enum PLATFORM
{
    undefined,
    browser,
    electron,
    android,
    ios
}

export class Platforms
{
    private _platform = PLATFORM.undefined;

    constructor()
    {
        this.initialize();
    }

    get Platform(): PLATFORM
    {
        return this._platform;
    }

    private initialize()
    {
        const platforms = getPlatforms().toString();

        const android: boolean = platforms.includes("android");
        const cordova: boolean = platforms.includes("cordova");
        const capacitor: boolean = platforms.includes("capacitor");
        const hybrid: boolean = platforms.includes("hybrid");
        const ios: boolean = platforms.includes("ios");
        const phablet: boolean = platforms.includes("phablet");
        const electron: boolean = platforms.includes("electron");
        const desktop: boolean = platforms.includes("desktop");

        console.log(`Platforms of this application are: ${platforms}.`);

        if (android && cordova && capacitor && hybrid)
        {
            this._platform = PLATFORM.android;
        }

        else if (ios && cordova && capacitor && hybrid)
        {
            this._platform = PLATFORM.ios;
        }
        else if (phablet && electron && desktop)
        {
            this._platform = PLATFORM.electron;
        }
        else
        {
            this._platform = PLATFORM.browser;
        }

        console.log(`The used platform is: ${PLATFORM[this._platform]}.`);
    }
}