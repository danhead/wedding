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
            <p>Here&#8217;s how our gift list works. Just pick the item you&#8217;d
              most like to give us. You&#8217;ll then be asked to leave your name
              and any message you have for us. There is the option to use the PayPal
              system to send your gift (you can use a credit card &ndash; you
              don&#8217;t need a PayPal account). Or, on the day, you could bring
              the value of your gift in a card.</p>
            <p>We&#8217;ll send you a link to our online photo gallery when we get
              back and we&#8217;ll be sure to tell (bore) you all about it in great
              detail.</p>
            <p className={s.sig}>Dan and Hana</p>
            <a
              className={s.button}
              href="https://www.our-wedding-list.co.uk/danielandhana/list"
            >
              View our list
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Giftlist);
