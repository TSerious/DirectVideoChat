import { object, serializable } from 'serializr';

export class Settings
{
    private _showHeader = false;
    private _headerHeight = 20;
    private _clearCalculatorInputs = true;
    private _showInfoPanel = true;
    private _experimentSettingsWidth = "50%";
    private _hideLegendOnExperimentSettingsFlyout = true;
    private _updateChartImmediately = true;
    private _showTips = true;
    private _useGramPerLtr = false;
    private _hideLegendByDefault = false;
    private _lastCalculatorSlide = 0;
    private _showScrollDownIndicator = true;

    @serializable
    get lastCalculatorSlide(): number
    {
        return this._lastCalculatorSlide;
    }

    set lastCalculatorSlide(lastCalculatorSlide: number)
    {
        this._lastCalculatorSlide = lastCalculatorSlide;
    }

    @serializable
    get showHeader(): boolean
    {
        return this._showHeader;
    }

    set showHeader(showHeader: boolean)
    {
        this._showHeader = showHeader;
    }

    @serializable
    get headerHeight(): number
    {
        return this._headerHeight;
    }

    set headerHeight(headerHeight: number)
    {
        this._headerHeight = headerHeight;
    }

    @serializable
    get clearInputs(): boolean
    {
        return this._clearCalculatorInputs;
    }

    set clearInputs(clear: boolean)
    {
        this._clearCalculatorInputs = clear;
    }

    @serializable
    get showInfoPanel(): boolean
    {
        return this._showInfoPanel;
    }

    set showInfoPanel(show: boolean)
    {
        this._showInfoPanel = show;
    }

    @serializable
    get experimentSettingsWidth(): string
    {
        return this._experimentSettingsWidth;
    }

    set experimentSettingsWidth(width: string)
    {
        this._experimentSettingsWidth = width;
    }

    @serializable
    get hideLegendOnExperimentSettingsFlyout(): boolean
    {
        return this._hideLegendOnExperimentSettingsFlyout;
    }

    set hideLegendOnExperimentSettingsFlyout(hide: boolean)
    {
        this._hideLegendOnExperimentSettingsFlyout = hide;
    }

    @serializable
    get updateChartImmediately(): boolean
    {
        return this._updateChartImmediately;
    }

    set updateChartImmediately(updateImmediately: boolean)
    {
        this._updateChartImmediately = updateImmediately;
    }

    @serializable
    get showTips(): boolean
    {
        return this._showTips;
    }

    set showTips(show: boolean)
    {
        this._showTips = show;
    }

    @serializable
    get useGramPerLtr(): boolean
    {
        return this._useGramPerLtr;
    }

    set useGramPerLtr(use: boolean)
    {
        this._useGramPerLtr = use;
    }

    @serializable
    get hideLegendByDefault(): boolean
    {
        return this._hideLegendByDefault;
    }

    set hideLegendByDefault(hide: boolean)
    {
        this._hideLegendByDefault = hide;
    }

    @serializable
    get showScrollDownIndicator(): boolean
    {
        return this._showScrollDownIndicator;
    }

    set showScrollDownIndicator(show: boolean)
    {
        this._showScrollDownIndicator = show;
    }
}