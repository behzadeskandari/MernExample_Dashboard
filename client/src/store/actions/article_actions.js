import * as articles  from './index';

import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:3001';


export const getArticles = (sort) => {
    return async(dispatch,getState) => {
        try{
            const arts = await axios.post(`/api/articles/loadmore`,sort);
            const prevArts = getState().articles.articles; 

            let newArts = [...arts.data];

            if(prevArts){
                newArts = [...prevArts,...arts.data];
            }

            dispatch(articles.getArticles(newArts));
            // dispatch(articles.successGlobal('Owesome'))
            console.log(newArts);


        }catch (error) {
            
            dispatch(articles.errorGlobal('Uppps error loading articles'));
        }
    }
}