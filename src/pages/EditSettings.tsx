import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonButtons,
    IonButton,
    IonToggle,
    IonRange,
    IonAlert,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { AppSettings } from '../data/AppSettings';
import TipsButtonLabel from './Settings/TipsButtonLabel';
import '../theme/EditSettings.css'
import ScrollDownContent from './ScrollDownContent';
import { ThickToolbar } from './ThickToolbar';

type EditSettingsProps = {
    appSettings: AppSettings,
}

const EditSettings: React.FC<EditSettingsProps> = ({ appSettings }) =>
{

    const toolBar = useRef<HTMLIonTabBarElement>(null);
    const heightRange = useRef<HTMLIonItemElement>(null);

    const [thickerHeader, setThickerHeader] = useState<boolean>(false);
    const [headerHeight, setHeaderHeight] = useState<number>(10);
    const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false);
    const [showTips, setShowTips] = useState<boolean>(false);
    const [clearCalculatorInputs, setClearInputs] = useState<boolean>(false);
    const [showThickerHeaderTip, setShowThickerHeaderTip] = useState<boolean>(false);
    const [showClearInputsTip, setShowClearInputsTip] = useState<boolean>(false);
    const [showInfoLabelTip, setShowInfoLabelTip] = useState<boolean>(false);
    const [showTipsTip, setShowTipsTip] = useState<boolean>(false);
    const [hideLegendByDefault, setHideLegendByDefault] = useState<boolean>(false);
    const [showScrollDown, setShowScrollDown] = useState<boolean>(false);
    const [showScrollDownTip, setShowScrollDownTip] = useState<boolean>(false);
    const [showHideLegendByDefaultTip, setShowHideLegendByDefaultTip] = useState<boolean>(false);

    const updateView = useCallback(() =>
    {
        setThickerHeader(appSettings.ShowHeader);
        setHeaderHeight(appSettings.HeaderHeight);
        setClearInputs(appSettings.ClearInputs);
        setShowInfoPanel(appSettings.ShowInfoPanel);
        setShowTips(appSettings.ShowTips);
        setHideLegendByDefault(appSettings.HideLegendByDefault);
        setShowScrollDown(appSettings.ShowScrollDownIndicator);
    }, [appSettings]);

    useEffect(() =>
    {
        if (toolBar.current)
        {
            if (appSettings.ShowHeader)
            {
                toolBar.current.style.setProperty("padding-top", appSettings.HeaderHeight + "px");
            }
            else
            {
                toolBar.current.style.setProperty("padding-top", "0px");
            }
        }

        if (heightRange.current)
        {
            if (thickerHeader)
            {
                heightRange.current.hidden = false;
            }
            else
            {
                heightRange.current.hidden = true;
            }
        }
    });

    useEffect(() =>
    {
        updateView();
    }, [appSettings, toolBar, updateView]);

    return (
        <IonPage>
            <IonHeader>
                <ThickToolbar appSettings={appSettings}>
                    <IonButtons slot="start">
                        <IonButton routerLink="/Home">
                            <IonIcon icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle class="headlineFont">
                        Settings
                    </IonTitle>
                </ThickToolbar>
            </IonHeader>
            <ScrollDownContent appSettings={appSettings}>
                <IonAlert
                    isOpen={showTipsTip}
                    header={'Show Tips'}
                    message={"Enable this to show a <b>?</b> where tips can be given. Click on any <b>?</b> to get a tip."}
                    onDidDismiss={() => setShowTipsTip(false)}
                    buttons={['OK']}
                />
                <IonAlert
                    isOpen={showClearInputsTip}
                    header={'Clear Inputs'}
                    message={"Enable this to clear an input, before you enter a new value."}
                    onDidDismiss={() => setShowClearInputsTip(false)}
                    buttons={['OK']}
                />
                <IonAlert
                    isOpen={showInfoLabelTip}
                    header={"Show Biophysical"}
                    message={"Enable this to show k<sub>on</sub>, k<sub>off</sub> and K<sub>D</sub> under the charts in the simulator."}
                    onDidDismiss={() => setShowInfoLabelTip(false)}
                    buttons={['OK']}
                />
                <IonAlert
                    isOpen={showHideLegendByDefaultTip}
                    header={'Hide Legend'}
                    message={"Enable this to hide the legend of newly created simulations by default."}
                    onDidDismiss={() => setShowHideLegendByDefaultTip(false)}
                    buttons={['OK']}
                />
                <IonAlert
                    isOpen={showScrollDownTip}
                    header={'Scroll Down Arrow'}
                    message={"Disable this to hide the blue arrow on the buttom which indicates that you can scroll down. The arrow is shown only on some pages."}
                    onDidDismiss={() => setShowThickerHeaderTip(false)}
                    buttons={['OK']}
                />
                <IonAlert
                    isOpen={showThickerHeaderTip}
                    header={'Thicker Header'}
                    message={"Enable this to increase the size of the top bar. This might be helpful on some phones."}
                    onDidDismiss={() => setShowThickerHeaderTip(false)}
                    buttons={['OK']}
                />
                <IonItem
                    lines="full"
                    class="settingsControl">
                    <IonLabel>
                        Show Tips
                    </IonLabel>
                    <IonToggle
                        color="primary"
                        checked={showTips}
                        onIonChange={() =>
                        {
                            appSettings.setShowTips(!showTips);
                            setShowTips(!showTips);
                        }}
                    />
                    <IonButton
                        class="tipsButton"
                        hidden={!showTips}
                        onClick={() => setShowTipsTip(true)}>
                        <TipsButtonLabel/>
                    </IonButton>
                </IonItem>
                <IonItem
                    lines="full"
                    class="settingsControl">
                    <IonLabel>
                        Clear Inputs
                    </IonLabel>
                    <IonToggle
                        color="primary"
                        checked={clearCalculatorInputs}
                        onIonChange={() =>
                        {
                            setClearInputs(!clearCalculatorInputs);
                            appSettings.setClearInputs(!appSettings.ClearInputs);
                        }}
                    />
                    <IonButton
                        class="tipsButton"
                        hidden={!showTips}
                        onClick={() => setShowClearInputsTip(true)}>
                        <TipsButtonLabel/>
                    </IonButton>
                </IonItem>
                <IonItem
                    lines="full"
                    class="settingsControl">
                    <IonLabel>
                        Show k<sub>on</sub>, k<sub>off</sub>, K<sub>D</sub>
                    </IonLabel>
                    <IonToggle
                        color="primary"
                        checked={showInfoPanel}
                        onIonChange={() =>
                        {
                            appSettings.setShowInfoPanel(!showInfoPanel);
                            setShowInfoPanel(!showInfoPanel);
                        }}
                    />
                    <IonButton
                        class="tipsButton"
                        hidden={!showTips}
                        onClick={() => setShowInfoLabelTip(true)}>
                        <TipsButtonLabel/>
                    </IonButton>
                </IonItem>
                <IonItem
                    lines="full"
                    class="settingsControl">
                    <IonLabel>
                        Hide Legend
                    </IonLabel>
                    <IonToggle
                        color="primary"
                        checked={hideLegendByDefault}
                        onIonChange={() =>
                        {
                            appSettings.setHideLegendByDefault(!hideLegendByDefault);
                            setHideLegendByDefault(!hideLegendByDefault);
                        }}
                    />
                    <IonButton
                        class="tipsButton"
                        hidden={!showTips}
                        onClick={() => setShowHideLegendByDefaultTip(true)}>
                        <TipsButtonLabel/>
                    </IonButton>
                </IonItem>
                <IonItem
                    lines="full"
                    class="settingsControl">
                    <IonLabel>
                        Show Scroll Down Arrow
                    </IonLabel>
                    <IonToggle
                        color="primary"
                        checked={showScrollDown}
                        onIonChange={() =>
                        {
                            appSettings.setShowScrollDownIndicator(!showScrollDown);
                            setShowScrollDown(!showScrollDown);
                        }}
                    />
                    <IonButton
                        class="tipsButton"
                        hidden={!showTips}
                        onClick={() => setShowScrollDownTip(true)}>
                        <TipsButtonLabel/>
                    </IonButton>
                </IonItem>
                <IonItem
                    lines="full"
                    class="settingsControl">
                    <table className="thickerHeaderTable">
                        <tbody>
                            <tr>
                                <td className="thickerHeaderTableLabel">
                                    <IonLabel>
                                            Thicker Header
                                    </IonLabel>
                                </td>
                                <td>
                                    <IonToggle
                                        color="primary"
                                        className="thickerHeaderToggle"
                                        checked={thickerHeader}
                                        onIonChange={() =>
                                        {
                                            appSettings.setShowHeader(!thickerHeader);
                                            setThickerHeader(!thickerHeader);
                                        }}
                                    />
                                </td>
                                <td>
                                    <IonButton
                                        class="tipsButton tipsThickerHeader"
                                        hidden={!showTips}
                                        onClick={() => setShowThickerHeaderTip(true)}>
                                        <TipsButtonLabel/>
                                    </IonButton>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}
                                    className="thickerHeaderSliderColumn">
                                    <IonRange
                                        class="thickerHeaderSlider"
                                        hidden={!thickerHeader}
                                        min={1}
                                        max={50}
                                        value={headerHeight}
                                        onIonChange={ev =>
                                        {
                                            const h = Number((ev.target as HTMLIonRangeElement).value);
                                            appSettings.setHeaderHeight(h);
                                            setHeaderHeight(h);
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </IonItem>
                <IonItem
                    lines="none"
                    routerLink="/About">
                    <IonLabel>
                        About
                    </IonLabel>
                </IonItem>
            </ScrollDownContent>
        </IonPage>
    );
};

export default EditSettings;
