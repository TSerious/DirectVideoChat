import React, { useEffect, useRef, useCallback } from 'react';
import { IonToolbar } from "@ionic/react"
import { AppSettings } from "../data/AppSettings"
import { useHistory } from 'react-router';
import "../theme/variables.css"

type ThickToolbarProps = {
    appSettings: AppSettings,
}

export const ThickToolbar: React.FC<ThickToolbarProps> = ({ children, appSettings }) =>
{

    const toolBar = useRef<HTMLIonTabBarElement>(null);
    const history = useHistory();

    const update = useCallback(() =>
    {
        if (!toolBar.current)
        {
            return;
        }

        if (appSettings.ShowHeader)
        {
            toolBar.current.style.setProperty("padding-top", appSettings.HeaderHeight + "px");
        }
        else
        {
            toolBar.current.style.setProperty("padding-top", "0px");
        }
    }, [appSettings]);

    useEffect(() =>
    {
        update();
    });

    useEffect(() =>
    {
        history.listen(() =>
        {
            update();
        })
        appSettings.onSettingsChanged.subscribe(() => update());
    },[])

    return (
        <>
            <IonToolbar
                ref={toolBar}
                id="toolbar"
                color="primary"
                class="headlineFont"
                onAnimationEnd={() => update()}
            >
                {children}
            </IonToolbar>
        </>
    )
}