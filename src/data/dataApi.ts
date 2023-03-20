/* eslint-disable @typescript-eslint/no-explicit-any */
import { Preferences } from '@capacitor/preferences';

const SIMULATIONKEYS = 'EXPERIMENTS';
const CURRENTSIMULATIONKEY = 'CURRENTEXPERIMENT';
const SETTINGS = 'SETTINGS'
const HOMECONTENT = 'HOMECONTENT'
export const WIKICONTENT = 'WIKICONTENT'

export const storeSimulationKeys = async (simulationKeys: any) =>
{
    await Preferences.set({ key: SIMULATIONKEYS, value: JSON.stringify(simulationKeys) });
}

export const loadSimulationKeys = async () =>
{
    const response = await Preferences.get({ key: SIMULATIONKEYS });
    return response.value;
}

export const store = async (key: string, simulation: any) =>
{
    await Preferences.set({ key: key, value: JSON.stringify(simulation) });
}

export const load = async (key: string) =>
{
    const response = await Preferences.get({ key: key });
    return response.value;
}

export const remove = async (key: string) =>
{
    await Preferences.remove({ key: key });
}

export const storeCurrentSimulationKey = async (experiment: any) =>
{
    await Preferences.set({ key: CURRENTSIMULATIONKEY, value: JSON.stringify(experiment) });
}

export const loadCurrentSimulationKey = async () =>
{
    const response = await Preferences.get({ key: CURRENTSIMULATIONKEY });
    return response.value;
}

export const storeSettings = async (settings: any) =>
{
    console.log("Storing settings...");
    await Preferences.set({ key: SETTINGS, value: JSON.stringify(settings) });
    console.log("Storing settings done.");
}

export const loadSettings = async () =>
{
    const response = await Preferences.get({ key: SETTINGS });
    return response.value;
}

export const getAllFiles = async () =>
{
    return Preferences.keys();
}

export const storeHomeContent = async (homeContent: any) =>
{
    await Preferences.set({ key: HOMECONTENT, value: JSON.stringify(homeContent) });
}

export const loadHomeContent = async () =>
{
    const response = await Preferences.get({ key: HOMECONTENT });
    return response.value;
}

export const storeWikiContent = async (wikiContent: any) =>
{
    await Preferences.set({ key: WIKICONTENT, value: JSON.stringify(wikiContent) });
}

export const loadWikiContent = async () =>
{
    const response = await Preferences.get({ key: WIKICONTENT });
    return response.value;
}

export const getTimeString = (): string =>
{
    const date = new Date(Date.now());
    return date.getMonth() + "-" +
        date.getDay() + "-" +
        date.getFullYear() + "-" +
        date.getHours() + ":" +
        date.getMinutes() + ":" +
        date.getSeconds();
}