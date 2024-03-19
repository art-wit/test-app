import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';

Meteor.startup(() => {
  const container = document.getElementById('theme-root');
  render(<App />, container);
});