import { apiKey } from "../constants/ApiKey";
import axios from "axios";

// Endpoints

const apiBaseUrl = "https://newsapi.org/v2"

const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=ru&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
const businessNewsUrl = `${apiBaseUrl}/top-headlines?country=ru&category=business&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
const technologyNewsUrl = `${apiBaseUrl}/top-headlines?country=ru&category=technology&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`

const discoverNewsUrl = (discover: any) => `${apiBaseUrl}/top-headlines?country=ru&category=${discover}&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`

const serachNewsUrl = (query: any) => `${apiBaseUrl}/top-headlines?q=${query}&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`

const apiCall = async (endpoints: any, params?: any) => {
    const options = {
        method: "GET",
        url: endpoints,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch(error) {
        console.log(error);
        return {};
    }
};

export const fetchBreakingNews = async () => {
    return await apiCall(breakingNewsUrl);
}

export const fetchBusinessNews = async () => {
    return await apiCall(businessNewsUrl);
}

export const fetchTechnologyNews = async () => {
    return await apiCall(technologyNewsUrl);
}

export const fetchDiscoverNews = async () => {
    return await apiCall(discoverNewsUrl);
}

export const fetchSearchNews = async (query: any) => {
    const endpoint = serachNewsUrl(query);
    return await apiCall(serachNewsUrl);
}