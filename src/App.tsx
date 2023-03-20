import React, { useEffect, useRef } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppSettings } from './data/AppSettings';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Video from './pages/Video';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    zoomPlugin,
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global { interface Window { require: any; } }

SplashScreen.show({
    autoHide: false,
    showDuration: 10000,
});

setupIonicReact();

/* Update this variable whenever there is a new version. */
export const VERSIONNUMBER = "0.0.1"

/* This should be set to true if the app is going to be an electron app. */
/* Usually this should be set to true in a build script. */
export const FORCEISELECTRONAPP = false;

const appSettings = new AppSettings();

interface appState
{
    appSettings: AppSettings,
}

const state: appState = {
    appSettings: appSettings,
}

const App: React.FC = () =>
{
    const tabs = useRef(null);
    const router = useRef(null);

    function setTabBarHeight(height: number)
    {
        try
        {
            const tabbar = document.getElementsByClassName("directvideo")[0].childNodes[0].childNodes[0].childNodes[1] as HTMLElement;
            tabbar?.style.setProperty("height", height.toString() + "px");
        }
        catch (e)
        {
            console.error("Couldn't set height of tabbar.", e);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function navigateToHome(tabs: any | null)
    {
        tabs?.context.navigate("/Video");
    }

    function navigateTo(tab: string)
    {
        if (!tabs.current)
        {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (tabs.current as any).context.navigate(tab);
    }

    const hideSplashScreen = () =>
    {
        SplashScreen.hide();
    }

    useEffect(() =>
    {
        if (FORCEISELECTRONAPP)
        {
            state.appSettings.setIsElectronApp(true);
        }
        else
        {
            try
            {
                const electron = window.require("Electron");
                if (electron != null)
                {
                    state.appSettings.setIsElectronApp(true);
                }
            }
            catch (_)
            {
                state.appSettings.setIsElectronApp(false);
            }
        }

        setTabBarHeight(65);
        navigateToHome(tabs.current);
        setTimeout(() => { hideSplashScreen(); }, 3000)
    }, [tabs]);

    return (
        <IonApp class="directvideo">
            <IonReactRouter ref={router}>
                <IonTabs ref={tabs}>
                    <IonRouterOutlet animated={true}>
                        <Route path="/Video" exact={true}>
                            <Video appSettings={state.appSettings} />
                        </Route>
                        <Route path="/" render={() => <Redirect to="/Video" />} exact={true} />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="Vide" href="/Video">
                            <IonIcon src="/assets/Home.svg" size="medium" />
                            <IonLabel class="textFont mainTabButtonLabel">Video</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
