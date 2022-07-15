import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';


const ArticleCard = () => {
    return (
        <Card>
            <CardMedia style={{height: 0,padding:'56.25%'}} 
                image="https://picsum.photos/200"
                title="some title"
            />
            <CardContent>
                <Typography variant="h5" component="h2">
                    some title
                </Typography>
                <Typography variant="body" component="p">
                    some Long Text Like Lorem Ipsum Test 
                    Just Like A Real Text Long And Beatiful Your Gonna Like It 
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
                <Button size='small' color="primary" component={RouterLink} to={`/article/id`}>
                    View Article
                </Button>
            </CardActions>
        </Card>
    )
}

export default ArticleCard;