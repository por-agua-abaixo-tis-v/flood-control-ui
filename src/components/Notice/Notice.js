import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    borderRadius: '5px',
    boxShadow: '0 2px 10px 0 rgba(0,0,0,0.5)',
    margin: '5px'
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  text:{
    margin: '10px',
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '24px',
    color: '#101220'
  }
});

export default function Notice(props) {
  const classes = useStyles();
  const { notice } = props;

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href={notice.tweet_url}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {notice.tweet_user_name}
              </Typography>
              <Typography variant="subtitle1" className={classes.text} paragraph>
                {notice.tweet_text}
              </Typography>
            </CardContent>
          </div>
          {/* <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden> */}
        </Card>
      </CardActionArea>
    </Grid>
  );
}