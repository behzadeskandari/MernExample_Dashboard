import * as articles  from './index';

import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:3001';


export const getArticles = (sort) => {
    return async(dispatch,getState) => {
        try{
            const arts = await axios.post(`/api/articles/loadmore`,sort);
            dispatch(articles.getArticles(arts.data));
            
            console.log(arts.data);

        }catch (error) {

        }
    }
}