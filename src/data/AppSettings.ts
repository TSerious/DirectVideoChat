import { observable, computed, action, } from "mobx";
import { list, object, serialize, deserialize, serializable } from 'serializr';
import { storeSettings, loadSettings } from './dataApi';
import { SignalDispatcher, ISignal } from "strongly-typed-events";
import { Settings } from "./Settings";
import { PLATFORM , Platforms } from "./Platforms";


export class AppSettings
{
    private _onSettingsChanged: SignalDispatcher = new SignalDispatcher();
    private _experimentSettingsWidthMin = 0.2;
    private _isElectronApp = false;
    private _platforms: Platforms = new Platforms();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _interval: any = null;
    private _scrollDownTolerance = 23;

    @serializable(list(object(Settings)))
    @observable
    private _settings: Settings = new Settings();

    constructor()
    {
        loadSettings()
            .then((settings) =>
            {
                if (typeof settings !== "undefined" && settings !== null)
                {
                    const json = JSON.parse(String(settings));
                    this._settings = deserialize(Settings, json);
                    this._onSettingsChanged.dispatch();
                }
            });

        console.log("settings loaded");
    }

    /**
     * @returns ISignal The signal that can be hooke up somewhere else
     */
    public get onSettingsChanged(): ISignal
    {
        return this._onSettingsChanged.asEvent();
    }

    @computed get IsElectronApp(): boolean
    {
        return this._isElectronApp;
    }

    @action setIsElectronApp(isElectronApp: boolean)
    {
        console.log("Setting isElectronApp to: " + isElectronApp);
        this._isElectronApp = isElectronApp;
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get Platform(): PLATFORM
    {
        return this._platforms.Platform;
    }

    @computed get ShowHeader(): boolean
    {
        return this._settings.showHeader;
    }

    @action setShowHeader(showHeader: boolean)
    {
        this._settings.showHeader = showHeader;
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get HeaderHeight(): number
    {
        return this._settings.headerHeight;
    }

    @action setHeaderHeight(headerHeight: number)
    {
        this._settings.headerHeight = headerHeight;
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get LastCalculatorSlide(): number
    {
        return this._settings.lastCalculatorSlide;
    }

    @action setLastCalculatorSlide(slide: number)
    {
        this._settings.lastCalculatorSlide = slide;
        this.saveSettingsDelayed();
    }

    @computed get ClearInputs(): boolean
    {
        return this._settings.clearInputs;
    }

    @action setClearInputs(clear: boolean)
    {
        this._settings.clearInputs = clear;
        this.saveSettingsDelayed();
    }

    @computed get ShowInfoPanel(): boolean
    {
        return this._settings.showInfoPanel;
    }

    @action setShowInfoPanel(show: boolean)
    {
        this._settings.showInfoPanel = show;
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get ShowTips(): boolean
    {
        return this._settings.showTips;
    }

    @action setShowTips(show: boolean)
    {
        this._settings.showTips = show;
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get UseGramPerLtr(): boolean
    {
        return this._settings.useGramPerLtr;
    }

    @action setUseGramPerLtr(use: boolean)
    {
        this._settings.useGramPerLtr = use;
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get HideLegendByDefault(): boolean
    {
        return this._settings.hideLegendByDefault;
    }

    @action setHideLegendByDefault(hide: boolean)
    {
        this._settings.hideLegendByDefault = hide;
        this.saveSettingsDelayed();
    }

    @computed get ShowScrollDownIndicator(): boolean
    {
        return this._settings.showScrollDownIndicator;
    }

    @action setShowScrollDownIndicator(show: boolean)
    {
        this._settings.showScrollDownIndicator = show;
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get ExperimentSettingsWidth(): number
    {
        return this.checkExperimentSettingsWidth();
    }

    @action setExperimentSettingsWidth(width: number)
    {
        if (width > 100)
        {
            width = 100;
        }
        else if (width < this._experimentSettingsWidthMin)
        {
            width = this._experimentSettingsWidthMin;
        }

        this._settings.experimentSettingsWidth = width.toString() + "%";
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get ExperimentSettingsWidthAsString(): string
    {
        this.checkExperimentSettingsWidth();
        return this._settings.experimentSettingsWidth;
    }

    @computed get ExperimentSettingsWidthMin(): number
    {
        return this._experimentSettingsWidthMin;
    }

    @computed get HideLegendOnExperimentSettingsFlyout(): boolean
    {
        return this._settings.hideLegendOnExperimentSettingsFlyout;
    }

    @action setHideLegendOnExperimentSettingsFlyout(hide: boolean)
    {
        this._settings.hideLegendOnExperimentSettingsFlyout = hide;
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get UpdateChartImmediately(): boolean
    {
        return this._settings.updateChartImmediately;
    }

    @action setUpdateChartImmediately(updateChartImmediately: boolean)
    {
        this._settings.updateChartImmediately = updateChartImmediately;
        this.saveSettingsDelayed();
        this._onSettingsChanged.dispatch();
    }

    @computed get ScrollDownTolerance(): number
    {
        return this._scrollDownTolerance;
    }

    private checkExperimentSettingsWidth(): number
    {
        if ((this._settings.experimentSettingsWidth.length < 2)
            || !this._settings.experimentSettingsWidth.endsWith("%"))
        {
            this._settings.experimentSettingsWidth = "50%";
        }

        let width: number = parseInt(
            this._settings.experimentSettingsWidth.substring(0, this._settings.experimentSettingsWidth.length - 1));

        if (isNaN(width) || width > 100 || width < this._experimentSettingsWidthMin*100)
        {
            this._settings.experimentSettingsWidth = "50%";
            width = 50;
        }

        return width;
    }

    private saveSettingsDelayed = async () =>
    {
        if (this._interval != null)
        {
            clearInterval(this._interval);
        }

        this._interval = setInterval(() =>
        {
            clearInterval(this._interval);
            this.saveSettings();
            this._interval = null;
        }, 3000)
    }

    private saveSettings = async () =>
    {
        storeSettings(serialize(this._settings));
    }
}