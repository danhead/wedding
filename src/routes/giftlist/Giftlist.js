import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Giftlist.css';

class Giftlist extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.bgImage} />
        <div className={s.container}>
          <div className={s.headings}>
            <h1>Gift list</h1>
          </div>
          <div className={s.content}>
            <p>We&#8217;ve been asked what we&#8217;d like for a gift and the answer
              is simple: you, at our wedding, having a great time.</p>
            <p>However, if you insist then we&#8217;ll say what we&#8217;d also love
              is the most amazing honeymoon possible. We have the basics covered but
              we&#8217;re hoping for the holiday of a lifetime. We would like to see
              and do everything we&#8217;ve dreamed about!</p>
            <p>Right now we&#8217;re busy curating our list, but fret not, we
              won&#8217;t take long! Please do check back here in the coming days,
              we&#8217;ll have a link on this page.</p>
            <p className={s.sig}>Dan and Hana</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Giftlist);
